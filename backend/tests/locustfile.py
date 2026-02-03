from locust import HttpUser, task, between

class TutorUser(HttpUser):
    wait_time = between(1, 3)

    @task
    def login(self):
        self.client.post(
            "/api/tutor/login",
            json={
                "email": "junior27nguetta@gmail.com",
                "password": "123999"
            }
        )
