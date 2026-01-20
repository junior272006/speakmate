import {
  Container,
  Title,
  Text,
  Stack,
  Divider,
  List,
} from '@mantine/core';

export default function Privacy() {
  return (
    <Container size="md" py="xl">
      <Stack gap="lg">
        <Title order={2} ta="center">
          Politique de confidentialité
        </Title>

        <Text ta="center" c="dimmed">
          Chez Speakmate, la protection de vos données personnelles est une priorité.
        </Text>

        <Divider />

        <Stack gap="md">
          <Title order={4}>1. Données collectées</Title>
          <Text>
            Speakmate collecte uniquement les informations nécessaires au bon
            fonctionnement de la plateforme.
          </Text>

          <List spacing="xs">
            <List.Item>
              Informations fournies par les tuteurs (nom, contact, description, photo).
            </List.Item>
            <List.Item>
              Données techniques de navigation (adresse IP, type de navigateur).
            </List.Item>
          </List>
        </Stack>

        <Stack gap="md">
          <Title order={4}>2. Inscription des utilisateurs</Title>
          <Text>
            Les étudiants n’ont pas besoin de créer un compte pour utiliser Speakmate.
            Seuls les tuteurs disposent d’un profil afin de proposer leurs services.
          </Text>
        </Stack>

        <Stack gap="md">
          <Title order={4}>3. Utilisation des données</Title>
          <Text>
            Les données collectées sont utilisées uniquement pour :
          </Text>

          <List spacing="xs">
            <List.Item>
              Afficher les profils des tuteurs sur la plateforme.
            </List.Item>
            <List.Item>
              Faciliter la mise en relation entre apprenants et tuteurs.
            </List.Item>
            <List.Item>
              Améliorer l’expérience utilisateur.
            </List.Item>
          </List>
        </Stack>

        <Stack gap="md">
          <Title order={4}>4. Partage des données</Title>
          <Text>
            Speakmate ne vend, ne loue et ne partage aucune donnée personnelle
            avec des tiers sans consentement explicite.
          </Text>
        </Stack>

        <Stack gap="md">
          <Title order={4}>5. Responsabilité</Title>
          <Text>
            Speakmate agit uniquement comme une plateforme de mise en relation.
            Les échanges, cours et accords se font directement entre l’étudiant
            et le tuteur.
          </Text>
        </Stack>

        <Stack gap="md">
          <Title order={4}>6. Sécurité</Title>
          <Text>
            Des mesures techniques et organisationnelles sont mises en place
            afin de protéger les données contre tout accès non autorisé.
          </Text>
        </Stack>

        <Stack gap="md">
          <Title order={4}>7. Vos droits</Title>
          <Text>
            Les tuteurs peuvent à tout moment demander la modification ou la
            suppression de leurs informations personnelles.
          </Text>
        </Stack>

        <Stack gap="md">
          <Title order={4}>8. Modifications</Title>
          <Text>
            Cette politique de confidentialité peut être mise à jour à tout moment.
            Toute modification sera publiée sur cette page.
          </Text>
        </Stack>

        <Divider />

        <Text size="sm" c="dimmed" ta="center">
          Dernière mise à jour : {new Date().getFullYear()}
        </Text>
      </Stack>
    </Container>
  );
}
