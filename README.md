# 🧠 COGNIASSESS

### *AI-Powered Non-Technical Role Assessment Platform*

---

## 📘 Overview

**COGNIASSESS** is an AI-driven assessment platform designed to transform the evaluation of **non-technical roles and soft skills**.
By leveraging **Large Language Models (LLMs)**—particularly a fine-tuned **Zephyr-7B model**—COGNIASSESS provides **personalized, bias-reduced, and holistic assessments** that address long-standing inefficiencies in traditional recruitment and evaluation processes.

This project represents a major step toward **objective, scalable, and adaptive assessments** tailored to diverse job roles, enhancing fairness and precision in modern hiring practices.

---

## 📍 Table of Contents

1. [Initial Motivation](#-initial-motivation)
2. [Literature Review](#-literature-review)
3. [Conventional Shortcomings](#-conventional-non-technical-role-assessment-shortcomings)
4. [System Architecture](#-system-architecture)
5. [Implementation Details](#-implementation-details)
6. [Model Deployment](#-model-deployment)
7. [Testing and Evaluation](#-testing-and-evaluation)
8. [Results and Performance](#-results-and-performance)
9. [Future Work](#-future-work)
10. [Conclusion](#-conclusion)
11. [Authors](#-authors)
12. [License](#-license)

---

## 💡 Initial Motivation

COGNIASSESS was conceived from the realization that **existing professional evaluation systems**—particularly for non-technical roles—are plagued with issues such as:

* Lack of personalization
* Overemphasis on technical skills
* Human bias and subjectivity
* Absence of actionable feedback

The goal was to create an **intelligent platform** that integrates AI-powered assessments with role-specific, real-time evaluation and feedback mechanisms.

Core principles guiding development:

1. **LLM-Based Assessment Generation and Evaluation**
2. **Bias Mitigation and Diversity Enhancement**
3. **Personalized, Role-Specific Evaluation Frameworks**
4. **Real-Time, Actionable Feedback**

---

## 📚 Literature Review

The literature highlights AI’s transformative impact on recruitment and assessment:

| Area                       | Key Insights                                                                                         |
| -------------------------- | ---------------------------------------------------------------------------------------------------- |
| **AI & Chatbots**          | ~58% of job seekers prefer AI-driven assessments for efficiency and accessibility.                   |
| **Bias Reduction**         | ~79% of executives agree AI enhances diversity through data anonymization and consistent evaluation. |
| **Performance Prediction** | AI improves hiring quality (by ~16%) and reduces attrition (~39%), as evidenced by Unilever’s case.  |
| **Workforce Forecasting**  | AI-driven analytics enable predictive planning and adaptive reskilling (e.g., IBM’s HR systems).     |

These studies underscore the **necessity of AI-integrated platforms** like COGNIASSESS to enable equitable and intelligent evaluation for non-technical roles.

---

## ⚙️ Conventional Non-Technical Role Assessment Shortcomings

1. **Generic Evaluation Models** — One-size-fits-all methods fail to adapt to role-specific contexts.
2. **Technical Bias** — Overemphasis on technical metrics overlooks interpersonal and cognitive skills.
3. **No Real-Time Feedback** — Candidates receive no immediate insight into their performance.
4. **Weak Skill Tracking** — Lack of progress tracking and skill analytics.
5. **Manual Processes** — Existing tools are resource-intensive and non-scalable.
6. **Limited Collaboration** — No peer or interactive feedback channels.

COGNIASSESS directly addresses these gaps through automation, personalization, and data-driven evaluation.

---

## 🧩 System Architecture

### 1. **Frontend (User Interface)**

* **Framework:** React.js (MERN Stack)
* **Features:**

  * Interactive assessment dashboard
  * Real-time feedback visualization
  * Profile management and analytics

### 2. **Backend**

* **Framework:** Node.js + Express
* **Purpose:**

  * Handles API requests, data routing, and authentication
  * Interfaces with the LLM model via Hugging Face Hub API

### 3. **Model Layer**

* **Base Model:** Zephyr-7B
* **Fine-Tuning Method:** PEFT (LoRA - Low-Rank Adaptation)
* **Frameworks Used:** PyTorch, Transformers, PEFT, BitsAndBytes

### 4. **Database**

* **Technology:** MongoDB
* **Purpose:** Stores user data, assessment logs, feedback, and performance metrics

---

## 🧠 Implementation Details

The **Zephyr-7B** model was fine-tuned to perform non-technical skill evaluations (e.g., communication, leadership, empathy).

### Key Steps:

1. **Model Training**

   * 90% of dataset for training, 10% for testing
   * Real-time monitoring with TensorBoard

2. **Fine-Tuning**

   * Used **LoRA** for parameter-efficient training
   * Reduced computational overhead without losing performance

3. **Evaluation Metrics**

   * Accuracy, Precision, Recall, and F1-score
   * Real-time loss visualization for optimization

---

## ☁️ Model Deployment

### 🔧 Preparation

* Finalized LoRA-adapted Zephyr-7B model
* Serialized and tested for compatibility

### 🚀 Hugging Face Integration

Steps performed:

1. **Repository Creation:**
   `huggingface.co/Sumsam/CogniAssess-v1`
2. **Upload Command:**

   ```python
   trainer.save_model("CogniAssess")
   trainer.push_to_hub("Sumsam/CogniAssess-v1")
   ```
3. **Model Merging:**

   ```python
   model = get_peft_model(CogniAssess, config)
   model = model.merge_and_unload()
   ```
4. **Push Merged Model:**

   ```python
   model.push_to_hub("Sumsam/CogniAssess-FYP-merged-v1.1", token=True)
   tokenizer.push_to_hub("Sumsam/CogniAssess-FYP-merged-v1.1", token=True)
   ```

### 🔗 Integration with COGNIASSESS Platform

* **API Integration:** Hugging Face inference API connected to MERN backend
* **Production Testing:** Validated performance in real-world conditions

---

## 🧪 Testing and Evaluation

### Dataset Partitioning

* **Training:** 90%
* **Testing:** 10%

### Validation Process

* Conducted multiple evaluation cycles
* Used TensorBoard for:

  * Loss visualization
  * Accuracy monitoring

### Key Observations

* Training stabilized after ~3 epochs
* Consistent reduction in loss over time
* Achieved high F1-score and precision

### Example TensorBoard Commands

```bash
%load_ext tensorboard
%tensorboard --logdir path_to_tensorboard_logs
```

---

## 📊 Results and Performance

| Metric             | Score                            |
| ------------------ | -------------------------------- |
| Accuracy           | High (close to target benchmark) |
| Precision / Recall | Balanced                         |
| F1-Score           | Stable across evaluation sets    |
| Loss Trend         | Smooth convergence               |
| Deployment Success | ✅ Hugging Face Model Accessible  |

The model exhibited strong generalization across varied non-technical domains, confirming its robustness.

---

## 🔮 Future Work

Planned extensions for **COGNIASSESS 2.0**:

1. **Comprehensive Candidate Profile Management**
2. **Advanced Anti-Proctoring Systems** for assessment integrity
3. **Expanded Assessment Modules** — integrating technical, behavioral, and scenario-based evaluations
4. **Adaptive Feedback System** powered by user analytics
5. **Gamified Learning Interface** for candidate engagement

---

## 🏁 Conclusion

COGNIASSESS sets a new benchmark for **AI-powered, bias-free recruitment assessment**.
By integrating **LLMs, personalized evaluation mechanisms, and MERN-based architecture**, it brings innovation, efficiency, and fairness to the forefront of hiring practices.

The successful fine-tuning, deployment, and integration of the **Zephyr-7B** model ensure that COGNIASSESS stands as a robust and scalable platform capable of reshaping how organizations assess non-technical competencies.

---

## 👩‍💻 Authors

**Project Lead:** Sumsam Ali
**Team:** COGNIASSESS Development Group
**Model Repository:** [Hugging Face – CogniAssess-v1](https://huggingface.co/Sumsam/CogniAssess-v1)

---

## 🪪 License

This project is licensed under the **MIT License**.
You are free to use, modify, and distribute the software, provided proper attribution is given.
