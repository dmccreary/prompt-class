# Generative AI Glossary

## Prompt

```linenums="0"
Create a glossary of terms for a class on generative AI.
Some terms will have an abbreviation.

Return the results in a single raw markdown file.

For each term use the following format:

#### Term (Abbreviation)

Defintion

```

#### Adversarial Attack

An attempt to deceive a machine learning model through malicious input. This can be done to test the robustness of the model or for malicious intent.

#### Adversarial Training

A training methodology where a model is trained to defend against adversarial attacks by including adversarial examples in its training data.

#### Autoencoder (AE)

A neural network used for unsupervised learning of efficient encodings by training the network to output its input, generally through a bottleneck layer to produce a compressed representation.

#### Backpropagation (Backprop)

A widely used algorithm in training feedforward neural networks for supervised learning. It computes the gradient of the loss function with respect to each weight by the chain rule of calculus.

#### Conditional Generative Adversarial Network (cGAN)

A type of GAN that generates data based on certain conditions or labels, allowing more control over the data it produces.


#### Data Augmentation

Techniques used to increase the amount of training data by applying various transformations on the existing data, such as rotations, translations, and scaling.


#### Deepfake

Hyper-realistic but entirely fake content generated using deep learning techniques. Often refers to videos where a person's likeness is swapped with another's.


#### Discriminator

In the context of GANs, it's the component that distinguishes between real and generated samples. Its objective is to classify real samples correctly and to reject generated samples.


#### Encoder

The part of an autoencoder that compresses the input into a compact representation.


#### Decoder

The part of an autoencoder that reconstructs the input from the compact representation.


#### Few-Shot Learning

Description: A machine learning approach where a model is trained to recognize new tasks or categories with very limited data, typically a handful of examples.

#### Generative Adversarial Network (GAN)

A class of machine learning frameworks where two networks, the generator and the discriminator, are trained simultaneously through adversarial processes.


#### Generator

In the context of GANs, it's the component that tries to generate data. Its objective is to produce data that the discriminator cannot distinguish from real data.


#### Latent Space

A compressed, abstract representation of data where similar data points are close together. It's often used in generative models as the space from which they sample to generate new data.


#### Loss Function

A function that measures the difference between the predicted output and the actual output. It's used to update model weights during training.


#### Neural Style Transfer

A technique in deep learning that applies the style of one image to transform the content of another image, while preserving the content's structure and detail.

#### One-Shot Learning

Description: A machine learning paradigm where a model is trained to recognize patterns or make decisions based on only a single example or very few examples of each class or category.




#### Reinforcement Learning (RL)

A type of machine learning where an agent learns to behave in an environment by performing certain actions and receiving rewards or penalties in return.


#### Transfer Learning

A machine learning method where a model developed for a task is reused as the starting point for a model on a second task.


#### Variational Autoencoder (VAE)

A type of autoencoder that aims to learn a probabilistic mapping between the data space and the latent space. It's used for generating new data that's similar to the input data.


#### Zero-Shot Learning

A type of machine learning where a model is trained to handle tasks for which it has seen no examples during training.

