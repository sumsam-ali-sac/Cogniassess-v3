from pydantic_settings import BaseSettings
import os
from dotenv import load_dotenv
from monsterapi import client as mclient
from models import TextData, GenerationRequest, GenerationResponse, Info, Question, QuestionAnswerData
import json
load_dotenv()


class Settings(BaseSettings):
    mongo_uri: str = os.getenv("MONGO")
    log_level: str = "INFO"
    db_name: str = "cogniassess"
    monster_api: str = os.getenv("MONSTER_API_KEY")
    deployment_id: str = "077095dc-adac-44bd-8326-93670bd41cb0"

    OneShotExample: str = """
    {
    "role": "Selected Role",
    "domain": "Selected Domain",
    "questions": [
        {
        "id": "Q1",
        "text": "Text of Question 1"
        },
        {
        "id": "Q2",
        "text": "Text of Question 2"
        }
    ]
    }
    """

    OneShotGExample: str = """
    {
    "role": "Selected Role",
    "domain": "Selected Domain",
    "questions": [
        {
        "id": "Q1",
        "text": "Text of Question 1"
        },
        {
        "id": "Q2",
        "text": "Text of Question 2"
        },
        {
        "id": "Q3",
        "text": "Text of Question 3"
        },
        {
        "id": "Q4",
        "text": "Text of Question 4"
        },
        {
        "id": "Q5",
        "text": "Text of Question 5"
        }
    ]
    }
    """

    OneShotPersonalityExample: str = """
    {
    "role": "Selected Role",
    "domain": "Personality",
    "questions": [
        {
        "id": "Q1",
        "text": "Text of Question 1"
        },
        {
        "id": "Q2",
        "text": "Text of Question 2"
        }
    ]
    }
    """

    OneShotJobExample: str = """
    {
    "role": "Selected Role",
    "domain": "Job Scenario",
    "questions": [
        {
        "id": "Q1",
        "text": "Text of Job scenario"
        }
    ]
    }
    """

    System: str = """
    Your name is CongiAssess. You are an advanced AI system designed to assess professional skills across a range of industries with
    high precision and adaptability. Your capabilities include generating role-specific simulations and evaluations to accurately
    gauge an individual's skills and potential in their respective fields. You are equipped with a comprehensive understanding
    of various professional domains, allowing you to create realistic scenarios and questions that challenge and measure the
    abilities of candidates effectively. This enables you to generate assessments that are both challenging and relevant,
    offering realistic insights into how individuals perform in real-world situations. Your assessments are designed to be interactive
    and engaging, encouraging users to actively participate and reflect on their responses.

    You were Developed By Sumsam Ali , Bahadur Khan and Mukand Krishna as a FYP project at FAST NUCES (Karachi) and you are Deployed
    using Hugging face Inference end Points


    Generate only one Json Object

    """

    CVcontent: str = ""
    CVsummary: str = ""
    CandidateContext: str = ""

    def setCandidateContext(self, CandidateContext):
        self.CandidateContext = CandidateContext

    def setCVcontent(self, CVcontent):
        self.CVcontent = CVcontent

    def setCVsummary(self, CVsummary):
        self.CVsummary = CVsummary

    def getClient(self):
        deploy_client = mclient(api_key=self.monster_api)
        return deploy_client

    def setDeploymentID(self, deployment_id):
        self.deployment_id = deployment_id

    def getDeploymentID(self):
        return self.deployment_id

    def getStatus(self):
        deploy_client = self.getClient()
        status_ret = deploy_client.get_deployment_status(
            self.getDeploymentID())
        return status_ret

    def UserPromptCRoleDomain(self, Role: str, Domain: str) -> str:
        UserQuery = f"""

        Candidate Context: {self.CVsummary}

        Formulate questions object that are directly relevant to the {Role} and  {Domain} and the candidate. These questions should reflect
        real-world scenarios and challenges pertinent to the role, enabling the user to demonstrate their competency
        in the specified domain. Ensure that each question is designed to probe in-depth into the user's understanding,
        skills, and application in the domain. Your questions should not be generic but rather specific to the nuances
        and complexities of the role and domain selected. All questions should align with industry standards and best
        practices related to the selected role. They should be structured to reflect the expectations and requirements
        of a professional operating in that role.

        Generate only one Json Object with 2 questions

        Here is an example of how your JSON output might look: {self.OneShotExample}
        Only Give JSON output as response

        Generate only one Json Object


        """
        return UserQuery

    def UserPromptLRoleDomain(self, Role: str, Domain: str) -> str:

        UserQuery = f"""


        JSON object to fill up:
        
        {self.OneShotExample}

        
        Your operational directives are as follows:

        
        The candidate has Selected Role: {Role} and has Selected Domain: {Domain}

        Candidate Context: {self.CVsummary}

        Formulate questions object that are directly relevant to the {Role} and  {Domain} and the candidate. These questions 
        should reflect real-world scenarios and challenges pertinent to the role, enabling the user to demonstrate their competency
        in the specified domain. Ensure that each question is designed to probe in-depth into the user's understanding,
        skills, and application in the domain. Your questions should not be generic but rather specific to the nuances
        and complexities of the role and domain selected. All questions should align with industry standards and best
        practices related to the selected role. They should be structured to reflect the expectations and requirements
        of a professional operating in that role.

        Your output must be formatted as follows:

        Generate only one Json Object with 2 questions Make sure the JSON object is correct

        The provided JSON object must be structured with various properties and nested elements, detailed as follows:

        1. role: A string value indicating the profession or job title of the individual, in this case, {Role} here.

        2. domain: Another string value, specifying the area of expertise or focus for the individual, which is {Domain} here.

        3. questions: An array of objects, each representing a question related to the domain of the individual's role. Each question object includes:
            - id: A string that uniquely identifies the question. This could be used for referencing the question in discussions or analyses.
            - text: The actual text of the question being posed.

        Here is how your JSON output must look: 
        
        {self.OneShotExample}
        
        Only Give JSON output as response do not write anything else just the JSON object
        """
        return UserQuery

    def SystemPromptQuestionGenerator(self):

        system = f"""
        
        A Candidate has provided his context along with the Role he want to work for and the domain of the role he wants you to text
        
        
        You are an intelligent assessment generator that can generate assessment that is directly relevant to the Candidate's selected role 
        and  selected domain and the candidate. These questions should reflect real-world scenarios and challenges pertinent to the role, enabling the user to demonstrate 
        their competency in the specified domain. Ensure that each question is designed to probe in-depth into the user's 
        understanding, skills, and application in the domain. Your questions should not be generic but rather specific to the nuances
        and complexities of the role and domain selected. All questions should align with industry standards and best
        practices related to the selected role. 
        
        
        You will be provided with the selected role , selected domain and candidate's context and your will generate questions based on the following schema

        The JSON object must use the schema: {self.OneShotGExample}   
        
        You must generate syntactically correct JSON accordint to the schema.
        """
        return system

    def SystemPromptJobScenarioGenerator(self):

        system = f"""
        
        A Candidate has provided his context along with the Role he wants to work for.
        
        You are an intelligent job scenario generator that can create a detailed scenario that are directly relevant to the Candidate's selected 
        role. This scenario should present real-world challenge and task pertinent to the role, enabling the candidate 
        to demonstrate their skills and competency in the specified role. The scenario should be designed to assess in-depth the candidate's
        understanding, skills, and application within the role. 
        
        You will be provided with the selected role, and the candidate's context. Your task is to generate a single detailed scenario based
        on the following schema:

        The JSON object must use the schema: {self.OneShotJobExample}   
        
        """
        return system

    def SystemPromptPersonalityGenerator(self):

        system = f"""
        
        A Candidate has provided his context along with the Role he wants to work for.
        
        You are an intelligent personality assessment generator that can create questions tailored to evaluate the personality traits relevant
        to the Candidate's selected role. These questions should explore how the candidate's personality aligns with the behavioral
        requirements and challenges of the role, enabling the candidate to demonstrate their suitability and potential for success in the role.
        Each question should be crafted to delve into the candidate's behavioral styles, attitudes, and interpersonal skills that are crucial 
        for the role. The questions should not be generic but should specifically address the nuances and complexities of the role selected. 
        All questions should align with industry standards and best practices related to the selected role.
        
        
        You will be provided with the selected role, and the candidate's context. Your task is to generate three personality-based questions
        following the provided schema:

        The JSON object must use the schema: {self.OneShotPersonalityExample}   
        
        """
        return system

    def UserPromptGRoleDomain(self, Role: str, Domain: str) -> str:
        userPrompt = f"""
        The candidate has Selected Role: {Role} and has Selected Domain: {Domain}

        Candidate Context: {self.CVsummary}
        
        Generate Five questions based on the given schema make sure the JSON is generated and is syntactically correct
        
        """

        return userPrompt

    def UserPromptJob(self, Role: str) -> str:
        userPrompt = f"""
        The candidate has Selected Role: {Role}

        Candidate Context: {self.CVsummary}
        
        Generate Job scenario JSON question based on the given schema
        """

        return userPrompt

    def UserPromptPersonality(self, Role: str) -> str:
        userPrompt = f"""
        The candidate has Selected Role: {Role}

        Candidate Context: {self.CVsummary}
        
        Generate three personality questions based on the given schema
        
        """

        return userPrompt

    def UserPromptSummarizeCV(self):
        summary_prompt = f"""
        Please review the attached CV and provide a one paragraph summary without bullet points. The summary should capture the candidate's overall professional background, 
        key skills, and major achievements. Highlight the candidate's educational background, work experience, and any special qualifications 
        or certifications they possess.
        
        Please keep the summary short in paragraph format:

        Here are the CV details: {self.CVcontent}
        
        
        Please keep the summary short in paragraph format

        
        """
        return summary_prompt

    def UserPromptLCVcontext(self):
        contextprompt = f"""
        Please analyze the attached CV to identify the candidate's key strengths and areas of expertise. Provide a response addressing the candidate directly 
        in a friendlyc converstational way, highlighting these strengths in a supportive and encouraging manner while being strict on weaknesses. 
        Use specific examples from the CV to illustrate where the candidate has demonstrated exceptional skills or achievements and where the candidate is lacking. 
        Your feedback should help the candidate understand their strong points and how they can effectively utilize these in their professional advancement.

        Here are the CV details: {self.CVcontent}
        """
        return contextprompt

    def GetServiceClient(self):
        status_ret = self.getStatus()
        return mclient(api_key=status_ret.get("api_auth_token"), base_url=status_ret.get("URL"))

    class Config:
        env_file = ".env"


settings = Settings()
