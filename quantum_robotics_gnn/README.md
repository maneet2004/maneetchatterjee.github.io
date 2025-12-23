# Quantum Entangled Graph Attention Network (QEGAN) for Multi-Robot Systems

## Novel Contribution

This work introduces **QEGAN (Quantum Entangled Graph Attention Network)**, a novel quantum-classical hybrid architecture specifically designed for multi-robot collaborative tasks. Unlike existing quantum GNN approaches that simply replace classical layers with quantum circuits, QEGAN leverages quantum entanglement to model long-range robot-robot interactions and uses quantum superposition for parallel exploration of multiple formation configurations.

## Key Innovations

1. **Quantum Entanglement-Based Attention**: Uses entangled qubits to compute attention weights between robots, capturing non-local correlations that are crucial for formation control.

2. **Superposition Path Planning**: Employs quantum superposition to simultaneously evaluate multiple path configurations, collapsing to optimal solutions after measurement.

3. **Hybrid Quantum-Classical Architecture**: Seamlessly integrates quantum circuits for feature extraction with classical graph convolutions for spatial reasoning.

4. **Dynamic Obstacle Avoidance**: Novel quantum interference pattern-based obstacle representation that allows efficient collision checking in quantum space.

## Robotics Task: Multi-Robot Formation Control

The task involves coordinating multiple robots to:
- Maintain a desired geometric formation
- Navigate through dynamic obstacles
- Minimize energy consumption
- Ensure collision-free paths

## Architecture Overview

```
Input Graph (Robot Network)
    ↓
Classical Feature Encoding
    ↓
Quantum Entanglement Layer (Novel)
    ↓
Quantum Attention Mechanism (Novel)
    ↓
Classical Graph Convolution
    ↓
Quantum Superposition Path Layer (Novel)
    ↓
Measurement & Action Selection
```

## Comparison Baselines

1. **Classical GNN**: Standard Graph Neural Network with attention
2. **Vanilla QGNN**: Simple quantum circuit replacement
3. **QEGAN (Ours)**: Novel entanglement-based architecture

## Results Summary

See `results/` directory for detailed experimental results and visualizations.

## Installation

```bash
pip install -r requirements.txt
```

## Usage

```bash
# Run complete experiment with novelty analysis
python run_experiments.py

# Run specific comparison
python compare_architectures.py --model qegan --num_robots 10
```

## Citation

If you use this work, please cite:
```
@article{qegan2025,
  title={Quantum Entangled Graph Attention Networks for Multi-Robot Systems},
  author={Novel Architecture},
  year={2025}
}
```
