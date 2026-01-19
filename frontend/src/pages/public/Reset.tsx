import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  PasswordInput,
  Button,
  Paper,
  Title,
  Text,
  Container,
  Stack,
  Alert,
  Center,
  ThemeIcon,
  Progress,
  Group,
  Box,
} from '@mantine/core';
import { IconLock, IconAlertCircle, IconCheck, IconX } from '@tabler/icons-react';

const API_URL = 'https://speakmate-backend-rhww.onrender.com';

export default function ResetPassword() {
  const navigate = useNavigate();
  const { token } = useParams<{ token: string }>();
  
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tokenValid, setTokenValid] = useState<boolean | null>(null);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const response = await fetch(`${API_URL}/api/email/reset-password/${token}`);
        const data = await response.json();
        
        setTokenValid(data.valid);
        if (!data.valid) {
          setError(data.message);
        }
      } catch (err) {
        setTokenValid(false);
        setError('Erreur de vérification du token');
      }
    };
    
    if (token) {
      checkToken();
    }
  }, [token]);

  const getPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (password.length >= 12) strength += 25;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 25;
    if (/\d/.test(password)) strength += 15;
    if (/[^a-zA-Z0-9]/.test(password)) strength += 10;
    return Math.min(strength, 100);
  };

  const strength = getPasswordStrength(password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!password || !confirmPassword) {
      setError('Veuillez remplir tous les champs');
      setLoading(false);
      return;
    }

    if (password.length < 8) {
      setError('Le mot de passe doit contenir au moins 8 caractères');
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/email/reset-password/${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      setSuccess(true);
      
      setTimeout(() => {
        navigate('/login');
      }, 3000);

    } catch (err: any) {
      setError(err.message || 'Erreur lors de la réinitialisation');
    } finally {
      setLoading(false);
    }
  };

  if (tokenValid === null) {
    return (
      <Container size={460} my={80}>
        <Center>
          <Stack align="center">
            <ThemeIcon size={80} radius="xl" variant="light">
              <IconLock size={40} />
            </ThemeIcon>
            <Text c="dimmed">Vérification du lien...</Text>
          </Stack>
        </Center>
      </Container>
    );
  }

  if (tokenValid === false) {
    return (
      <Container size={460} my={80}>
        <Center mb="xl">
          <ThemeIcon size={80} radius="xl" color="brandRed" variant="light">
            <IconX size={40} />
          </ThemeIcon>
        </Center>

        <Paper radius="md" p="xl">
          <Title order={2} ta="center" mb="md">
            Lien invalide ou expiré
          </Title>
          
          <Text c="dimmed" size="sm" ta="center" mb="xl">
            {error || 'Ce lien de réinitialisation n\'est plus valide. Veuillez en demander un nouveau.'}
          </Text>

          <Button
            fullWidth
            onClick={() => navigate('/forgot-password')}
          >
            Demander un nouveau lien
          </Button>
        </Paper>
      </Container>
    );
  }

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
            Mot de passe réinitialisé
          </Title>
          
          <Text c="dimmed" size="sm" ta="center" mb="xl">
            Votre mot de passe a été modifié avec succès. Vous allez être redirigé vers la page de connexion...
          </Text>

          <Center>
            <Progress value={100} size="sm" w="100%" animated />
          </Center>
        </Paper>
      </Container>
    );
  }

  return (
    <Container size={460} my={80}>
      <Center mb="xl">
        <ThemeIcon size={80} radius="xl" variant="gradient">
          <IconLock size={40} />
        </ThemeIcon>
      </Center>

      <Title ta="center" fw={700} mb="xs">
        Nouveau mot de passe
      </Title>
      <Text c="dimmed" size="sm" ta="center" mb="xl">
        Choisissez un nouveau mot de passe sécurisé
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
            <PasswordInput
              label="Nouveau mot de passe"
              placeholder="Au moins 8 caractères"
              leftSection={<IconLock size={16} />}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              required
            />

            {password && (
              <Box>
                <Group justify="space-between" mb={5}>
                  <Text size="xs" c="dimmed">Force du mot de passe</Text>
                  <Text size="xs" c="dimmed">{strength}%</Text>
                </Group>
                <Progress
                  value={strength}
                  color={strength < 50 ? 'brandRed' : strength < 80 ? 'yellow' : 'brandGreen'}
                  size="sm"
                />
              </Box>
            )}

            <PasswordInput
              label="Confirmer le mot de passe"
              placeholder="Retapez votre mot de passe"
              leftSection={<IconLock size={16} />}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={loading}
              required
              error={confirmPassword && password !== confirmPassword ? 'Les mots de passe ne correspondent pas' : null}
            />

            <Button
              type="submit"
              fullWidth
              loading={loading}
              size="md"
              disabled={!password || !confirmPassword || password !== confirmPassword}
            >
              Réinitialiser le mot de passe
            </Button>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
}