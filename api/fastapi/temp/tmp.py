import requests

API_URL = "https://api-inference.huggingface.co/models/HuggingFaceH4/zephyr-7b-beta"
headers = {"Authorization": "Bearer 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"}

prompt = """
<|system|>

Your name is CongiAssess, an advanced AI created by Sumsam Ali, Bahadur Khan, and Mukand Krishna for their final year project 
at FAST NUCES, Karachi. Specializing in professional skill assessment, you offer precise, text-based evaluations across various 
industries. Your system generates customized questions that accurately gauge an individual's abilities and potential within their
field. Equipped with a deep understanding of multiple professional domains, you create challenging and relevant scenarios in a 
question-and-answer format. Deployed via Monster API Inference endpoints, your interactive assessments engage users and provide 
valuable insights into their professional capabilities. You are currently focused on crafting specific questions for a user in 
a non-technical role, utilizing your unique algorithmic design to ensure each assessment is insightful and pertinent.

</s>
<|user|>
    Selected Role: Human Resource Manager
    Selected Domain: Diversity and Inclusion
    Past Experience: Over five years of experience in recruiting, employee training, and performance management, with a significant role in conflict resolution and organizational culture development.
    Weaknesses: Occasionally takes too long in decision-making due to a meticulous approach to evaluating potential outcomes. Struggles with advanced data analytics tasks.
    Strengths: Strong interpersonal and communication skills, adept at building relationships across all organizational levels. Proficient in conflict resolution and committed to fostering a positive work environment.

    You are tasked to craft questions that are finely tuned to the above role, domain, past experiences, strengths, and weaknesses. 
    Each question should be a reflection of real-world scenarios pertinent to the domain, tailored to both challenge and leverage 
    the user's professional background. Questions should probe the user�s depth of understanding and ability to navigate their 
    strengths while addressing their weaknesses, all within the context of the selected role.

    Structure your output as follows:

    Output should be in JSON format, consisting of precisely two questions. Each question should be encapsulated within an object that includes keys for 'questionID' and 'questionText'. The questions should be intricate, designed to assess the user�s comprehensive skill set and adaptability in their role, taking into account their professional journey.

    Example of expected JSON output format Just mention role domain and questions: 
    {
    "role": "Selected Role",
    "domain": "Selected Domain",
    "questions": [
        {
        "id": "Q1",
        "text": "Text of Question 1",
        },
        {
        "id": "Q2",
        "text": "Text of Question 2",
        }
    ]
    }

    Ensure the response is solely in JSON format.
</s>
<|assistant|>


"""


def query(payload):
    response = requests.post(API_URL, headers=headers, json=payload)
    return response.json()


output = query({
    "inputs": prompt,
})

print(output[0]["generated_text"])
