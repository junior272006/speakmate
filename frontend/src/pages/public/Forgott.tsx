import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TextInput,
  Button,
  Paper,
  Title,
  Text,
  Container,
  Stack,
  Alert,
  Center,
  ThemeIcon,
} from '@mantine/core';
import { IconMail, IconAlertCircle, IconCheck, IconArrowLeft } from '@tabler/icons-react';

const API_URL = 'https://speakmate-backend-rhww.onrender.com';

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!email || !email.includes('@')) {
      setError('Email invalide');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/email/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Erreur lors de l\'envoi');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <Container size={460} my={80}>
        <Center mb="xl">
          <ThemeIcon size={80} radius="xl" variant="gradient" gradient={{ from: 'brandGreen.5', to: 'brandGreen.6' }}>
            <IconCheck size={40} />
          </ThemeIcon>
        </Center>

        <Paper radius="md" p="xl">
          <Title order={2} ta="center" mb="md">
            Email envoyé
          </Title>
          
          <Text c="dimmed" size="sm" ta="center" mb="md">
            Si un compte existe avec l'adresse <strong>{email}</strong>, vous recevrez un lien de réinitialisation dans quelques instants.
          </Text>

          <Text c="dimmed" size="xs" ta="center" mb="xl">
            Vérifiez également vos spams si vous ne voyez pas l'email.
          </Text>

          <Button
            fullWidth
            variant="light"
            leftSection={<IconArrowLeft size={16} />}
            onClick={() => navigate('/login')}
          >
            Retour à la connexion
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container size={460} my={80}>
      <Center mb="xl">
        <ThemeIcon size={80} radius="xl" variant="gradient">
          <IconMail size={40} />
        </ThemeIcon>
      </Center>

      <Title ta="center" fw={700} mb="xs">
        Mot de passe oublié
      </Title>
      <Text c="dimmed" size="sm" ta="center" mb="xl">
        Entrez votre email pour recevoir un lien de réinitialisation
      </Text>

      <Paper radius="md" p="xl">
        {error && (
          <Alert
            icon={<IconAlertCircle size={16} />}
            title="Erreur"
            color="brandRed"
            mb="lg"
            variant="light"
          >
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Stack>
            <TextInput
              label="Email"
              placeholder="exemple@email.com"
              leftSection={<IconMail size={16} />}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              required
            />

            <Button
              type="submit"
              fullWidth
              loading={loading}
              size="md"
            >
              Envoyer le lien
            </Button>

            <Button
              fullWidth
              variant="subtle"
              leftSection={<IconArrowLeft size={16} />}
              onClick={() => navigate('/login')}
            >
              Retour à la connexion
            </Button>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
}