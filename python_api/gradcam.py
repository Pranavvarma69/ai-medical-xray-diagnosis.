import tensorflow as tf
import numpy as np
import cv2
import os

def generate_gradcam(model, img_array, original_img, output_dir):
    os.makedirs(output_dir, exist_ok=True)

    # EfficientNet is first layer in Sequential
    base_model = model.layers[0]

    # Last conv layer
    last_conv_layer = base_model.get_layer("top_conv")

    # Create a model that maps input → last conv + output
    grad_model = tf.keras.models.Model(
        inputs=model.inputs,
        outputs=[last_conv_layer.output, model.outputs]
    )

    with tf.GradientTape() as tape:
        conv_outputs, predictions = grad_model(img_array, training=False)
        pred_index = tf.argmax(predictions[0])
        loss = predictions[:, pred_index]

    # Gradients
    grads = tape.gradient(loss, conv_outputs)

    # Global average pooling
    pooled_grads = tf.reduce_mean(grads, axis=(0, 1, 2))

    conv_outputs = conv_outputs[0]
    heatmap = tf.reduce_sum(conv_outputs * pooled_grads, axis=-1)

    # Normalize
    heatmap = tf.maximum(heatmap, 0)
    heatmap /= tf.reduce_max(heatmap)
    heatmap = heatmap.numpy()

    # Resize to image size
    heatmap = cv2.resize(
        heatmap,
        (original_img.shape[1], original_img.shape[0])
    )

    heatmap = np.uint8(255 * heatmap)
    heatmap = cv2.applyColorMap(heatmap, cv2.COLORMAP_JET)

    overlay = cv2.addWeighted(
        cv2.cvtColor(original_img, cv2.COLOR_RGB2BGR),
        0.6,
        heatmap,
        0.4,
        0
    )

    output_path = os.path.join(output_dir, "gradcam.png")
    cv2.imwrite(output_path, overlay)

    return output_path