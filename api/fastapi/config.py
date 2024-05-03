from pydantic_settings import BaseSettings
import os
from dotenv import load_dotenv
from monsterapi import client as mclient
load_dotenv()


def UserPrompt(self, Role: str, Domain: str) -> str:
    UserQuery = f"""

        Formulate questions object that are directly relevant to the {Role} and  {Domain}. These questions should reflect
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


class Settings(BaseSettings):
    mongo_uri: str = os.getenv("MONGO")
    log_level: str = "INFO"
    db_name: str = "cogniassess"
    moster_api: str = os.getenv("MONSTER_API_KEY")
    deployment_id: str = ""
    OneShotExample: str = """
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

    PastExperience: str = ""
    Weaknesses: str = ""
    Strengths: str = ""

    @property
    def headers(self):
        return {"Authorization": f"Bearer {self.api_url}"}

    @property
    def getClient(self):
        deploy_client = mclient(api_key=self.moster_api)
        return deploy_client

    def setDeploymentID(self, deployment_id):
        self.deployment_id = deployment_id

    @property
    def getDeploymentID(self):
        return self.deployment_id

    @property
    def getStatus(self):
        deploy_client = self.getClient()
        status_ret = deploy_client.get_deployment_status(
            self.getDeploymentID())
        return status_ret

    def UserPrompt(self, Role: str, Domain: str) -> str:
        UserQuery = f"""

        Formulate questions object that are directly relevant to the {Role} and  {Domain}. These questions should reflect
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

    @property
    def GetServiceClient(self):
        status_ret = self.getStatus()
        return mclient(api_key=status_ret.get("api_auth_token"), base_url=status_ret.get("URL"))

    @property
    class Config:
        env_file = ".env"


settings = Settings()
