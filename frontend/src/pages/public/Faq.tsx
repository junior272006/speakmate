import {
  Container,
  Title,
  Text,
  Accordion,
  Stack,
  Divider,
} from '@mantine/core';

export default function FAQ() {
  return (
    <Container size="md" py="xl">
      <Stack gap="lg">
        <Title order={2} ta="center">
          Foire Aux Questions
        </Title>

        <Text ta="center" c="dimmed">
          Retrouvez ici les réponses aux questions les plus fréquentes sur Speakmate.
        </Text>

        <Divider />

        <Accordion
          radius="md"
          variant="separated"
          multiple
        >
          <Accordion.Item value="what-is-speakmate">
            <Accordion.Control>
              Qu’est-ce que Speakmate ?
            </Accordion.Control>
            <Accordion.Panel>
              Speakmate est une plateforme qui met en relation des apprenants en anglais
              avec des tuteurs disponibles pour pratiquer l’anglais à l’oral et à l’écrit.
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item value="student-signup">
            <Accordion.Control>
              Les étudiants doivent-ils s’inscrire ?
            </Accordion.Control>
            <Accordion.Panel>
              Non. Les étudiants n’ont pas besoin de créer un compte.
              Ils peuvent consulter les profils des tuteurs et les contacter directement.
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item value="who-can-be-tutor">
            <Accordion.Control>
              Qui peut devenir tuteur sur Speakmate ?
            </Accordion.Control>
            <Accordion.Panel>
              Toute personne ayant un bon niveau en anglais et souhaitant aider
              d’autres apprenants peut devenir tuteur, sous réserve de validation.
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item value="course-management">
            <Accordion.Control>
              Speakmate organise-t-il les cours ?
            </Accordion.Control>
            <Accordion.Panel>
              Non. Speakmate ne gère ni les cours ni les paiements.
              Les modalités sont définies directement entre l’étudiant et le tuteur.
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item value="pricing">
            <Accordion.Control>
              Speakmate est-il gratuit ?
            </Accordion.Control>
            <Accordion.Panel>
              Oui. L’accès à la plateforme est gratuit pour les étudiants.
              Certaines options pour les tuteurs pourront être payantes à l’avenir.
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item value="contact-tutor">
            <Accordion.Control>
              Comment contacter un tuteur ?
            </Accordion.Control>
            <Accordion.Panel>
              Les coordonnées du tuteur sont affichées sur son profil
              (WhatsApp, téléphone ou email selon les informations fournies).
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item value="responsibility">
            <Accordion.Control>
              Speakmate est-il responsable des échanges ?
            </Accordion.Control>
            <Accordion.Panel>
              Non. Speakmate agit uniquement comme plateforme de mise en relation
              et n’est pas responsable des échanges entre les utilisateurs.
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item value="report-problem">
            <Accordion.Control>
              Comment signaler un problème ?
            </Accordion.Control>
            <Accordion.Panel>
              Un système de signalement est disponible sur les profils des tuteurs.
              Toute activité suspecte peut être reportée à l’équipe Speakmate.
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </Stack>
    </Container>
  );
}
