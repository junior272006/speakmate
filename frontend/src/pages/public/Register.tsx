import { useState } from 'react';
import { 
  Button, Group, TextInput, PasswordInput, Stack, Paper, Textarea,
  Title, Text, Container, Center, ThemeIcon, Alert, Avatar,
  Checkbox, MultiSelect, Progress, Badge
} from '@mantine/core';
import { 
  IconUser, IconMail, IconPhone, IconLock, IconAlertCircle, IconCheck, IconUpload,
  IconArrowLeft, IconArrowRight
} from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { registerTutor } from '../../api/authService';
import type { TutorData } from '../../api/authService';

export default function Signup() {
  const navigate = useNavigate();
 
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');

  const [formData, setFormData] = useState<TutorData>({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    country: '',
    phone: '',
    avatar: null,
    formation: '',
    experience: '',
    level: [],
    presentation: '',
    termsAccepted: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (file: File | null) => {
    console.log('handleFileChange appelé', file);
    
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Veuillez sélectionner une image');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("L'image ne doit pas dépasser 5MB");
      return;
    }

    setAvatarFile(file);
    setError('');

    console.log('Début du chargement de l\'image');
    
    // Utiliser FileReader pour tous les appareils (plus fiable sur mobile)
    const reader = new FileReader();
    reader.onload = (e) => {
      console.log('Image chargée avec succès');
      if (e.target?.result) {
        setPreview(e.target.result as string);
        console.log('Preview défini');
      }
    };
    reader.onerror = () => {
      console.error('Erreur de chargement');
      setError("Impossible de charger l'image");
    };
    reader.readAsDataURL(file);
  };

  const handleLevelChange = (values: string[]) => {
    setFormData({ ...formData, level: values });
  };

  const handleTermsChange = (checked: boolean) => {
    setFormData({ ...formData, termsAccepted: checked });
  };

  const nextStep = () => {
    if (activeStep === 0) {
      if (!formData.firstname || !formData.lastname || !formData.email || 
          !formData.phone || !formData.country || !formData.password) {
        setError('Veuillez remplir tous les champs obligatoires');
        return;
      }
      if (formData.password.length < 6) {
        setError('Le mot de passe doit contenir au moins 6 caractères');
        return;
      }
    }
    setError('');
    setActiveStep((current) => Math.min(current + 1, 2));
  };

  const prevStep = () => setActiveStep((current) => Math.max(current - 1, 0));

  const handleSubmit = async () => {
    if (!formData.termsAccepted) {
      setError('Vous devez accepter les conditions');
      return;
    }
    setLoading(true);
    try {
      await registerTutor({ ...formData, avatar: avatarFile });
      setSuccess(true);
      setTimeout(() => navigate('/'), 3500);
    } catch (err: any) {
      setError(err.message || "Erreur lors de l'inscription");
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    { label: 'Infos personnelles', description: 'Informations de base' },
    { label: 'Formation', description: 'Parcours professionnel' },
    { label: 'Validation', description: 'Vérification et envoi' }
  ];

  if (success) {
    return (
      <Container size="md" py={60}>
        <Center style={{ minHeight: 300 }}>
          <Stack align="center" gap="xl">
            <ThemeIcon size={80} radius="xl" color="brandGreen" variant="light">
              <IconCheck size={48} />
            </ThemeIcon>
            <Title order={2} c="brandGreen.6">Inscription validée !</Title>
            <Text size="lg" ta="center" c="dimmed" maw={400}>
              Votre compte tuteur a été créé avec succès. Vous allez être redirigé vers l'accueil dans quelques instants...
            </Text>
          </Stack>
        </Center>
      </Container>
    );
  }

  return (
    <Container size="md" py={60}>
      <Paper shadow="md" p="xl" radius="md">
        <Title order={2} ta="center" mb="xl">Créer un compte Tuteur</Title>
        
        {error && (
          <Alert 
            icon={<IconAlertCircle size={18} />} 
            color="red" 
            withCloseButton
            onClose={() => setError('')}
            mb="md"
          >
            {error}
          </Alert>
        )}

        {/* Stepper */}
        <Stack gap="md" mb="xl">
          <Group justify="center" gap="sm" wrap="nowrap" style={{ overflow: 'auto' }}>
            {steps.map((step, index) => (
              <Stack key={index} gap={6} align="center" style={{ minWidth: '80px', flex: 1 }}>
                <Badge 
                  color={activeStep >= index ? 'brandBlue' : 'gray'} 
                  variant={activeStep === index ? 'filled' : 'light'}
                  size="lg"
                  circle
                  style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  {index + 1}
                </Badge>
                <div style={{ textAlign: 'center', width: '100%' }}>
                  <Text size="xs" fw={500} lineClamp={1}>{step.label}</Text>
                </div>
              </Stack>
            ))}
          </Group>
          <Progress value={((activeStep + 1) / steps.length) * 100} size="sm" radius="xl" />
        </Stack>

        {/* Step 1 */}
        {activeStep === 0 && (
          <Stack gap="md">
            <Group gap="md" grow>
              <TextInput label="Prénom" name="firstname" value={formData.firstname} onChange={handleChange} placeholder="Prénom" leftSection={<IconUser size={16} />} required />
              <TextInput label="Nom" name="lastname" value={formData.lastname} onChange={handleChange} placeholder="Nom" leftSection={<IconUser size={16} />} required />
            </Group>

            <TextInput label="Email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="exemple@gmail.com" leftSection={<IconMail size={16} />} required />
            <TextInput label="Téléphone" name="phone" value={formData.phone} onChange={handleChange} placeholder="Ex : 0102030405" leftSection={<IconPhone size={16} />} required />
            <TextInput label="Pays" name="country" value={formData.country} onChange={handleChange} placeholder="Ex : France" required />
            <PasswordInput label="Mot de passe" name="password" value={formData.password} onChange={handleChange} placeholder="6 caractères minimum" leftSection={<IconLock size={16} />} required />

            <Center>
              <Stack align="center" gap="sm">
                {preview ? (
                  <Avatar src={preview} size={120} radius="xl" styles={{ image: { objectFit: 'cover' } }} />
                ) : (
                  <Avatar size={120} radius="xl" color="brandBlue"><IconUser size={48} /></Avatar>
                )}
                <input
                  type="file"
                  accept="image/*"
                  id="avatar-upload"
                  style={{ display: 'none' }}
                  onChange={(e) => {
                    console.log('Input onChange déclenché', e.target.files);
                    const file = e.target.files?.[0];
                    if (file) {
                      console.log('Fichier trouvé:', file.name, file.type, file.size);
                      handleFileChange(file);
                    } else {
                      console.log('Aucun fichier sélectionné');
                    }
                  }}
                  onClick={(e) => {
                    // Reset pour permettre de sélectionner la même image
                    (e.target as HTMLInputElement).value = '';
                  }}
                />
                <Button
                  component="label"
                  htmlFor="avatar-upload"
                  variant="light"
                  color="brandBlue"
                  leftSection={<IconUpload size={16} />}
                  size="sm"
                >
                  {preview ? 'Changer la photo' : 'Ajouter une photo'}
                </Button>
              </Stack>
            </Center>
          </Stack>
        )}

        {/* Step 2 */}
        {activeStep === 1 && (
          <Stack gap="md">
            <TextInput label="Formation" name="formation" value={formData.formation} onChange={handleChange} placeholder="Ex : Licence Informatique" />
            <TextInput label="Expérience" name="experience" value={formData.experience} onChange={handleChange} placeholder="Ex : 2 ans comme professeur" />
            <MultiSelect label="Niveaux enseignés" data={['Débutant','Intermédiaire','Avancé']} value={formData.level || []} onChange={handleLevelChange} placeholder="Choisissez les niveaux" />
            <Textarea label="Présentation" name="presentation" value={formData.presentation} onChange={handleChange} placeholder="Parlez de vous..." minRows={4} />
          </Stack>
        )}

        {/* Step 3 */}
        {activeStep === 2 && (
          <Stack gap="md">
            <Checkbox label="J'accepte les conditions d'utilisation" checked={formData.termsAccepted} onChange={(e) => handleTermsChange(e.currentTarget.checked)} required />
            <Paper p="md" withBorder>
              <Title order={4} mb="sm">Récapitulatif de votre inscription</Title>
              <Stack gap="xs">
                <Text><strong>Prénom:</strong> {formData.firstname}</Text>
                <Text><strong>Nom:</strong> {formData.lastname}</Text>
                <Text><strong>Email:</strong> {formData.email}</Text>
                <Text><strong>Téléphone:</strong> {formData.phone}</Text>
                <Text><strong>Pays:</strong> {formData.country}</Text>
                <Text><strong>Formation:</strong> {formData.formation}</Text>
                <Text><strong>Expérience:</strong> {formData.experience}</Text>
                <Text><strong>Niveaux:</strong> {formData.level?.join(', ') || 'Aucun'}</Text>
                <Text><strong>Présentation:</strong> {formData.presentation}</Text>
              </Stack>
            </Paper>
          </Stack>
        )}

        {/* Navigation */}
        {activeStep < 2 ? (
          <Group mt="xl" justify="space-between">
            <Button variant="default" onClick={prevStep} disabled={activeStep === 0} leftSection={<IconArrowLeft size={16} />}>Précédent</Button>
            <Button onClick={nextStep} rightSection={<IconArrowRight size={16} />}>Suivant</Button>
          </Group>
        ) : (
          <Stack mt="xl" gap="md">
            <Group justify="space-between">
              <Button variant="default" onClick={prevStep} leftSection={<IconArrowLeft size={16} />}>Précédent</Button>
            </Group>
            <Center>
              <Button color="brandBlue" onClick={handleSubmit} loading={loading} size="lg" rightSection={<IconCheck size={16} />}>Créer le compte</Button>
            </Center>
          </Stack>
        )}
      </Paper>
    </Container>
  );
}