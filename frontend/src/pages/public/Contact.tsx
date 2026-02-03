import {
  Container,
  Title,
  Text,
  Stack,
  Group,
  Paper,
  ActionIcon,
} from '@mantine/core';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import {
  IconBrandWhatsapp,
  IconBrandLinkedin,
  IconMail,
} from '@tabler/icons-react';

export default function Contact() {
  return (
    <>
    <Header />
    <Container size="sm" style={{ 
      display: 'flex', 
      alignItems: 'center', 
      minHeight: '100vh' 
    }}>
      <Stack gap="lg" align="center" w="100%">
        <Title order={2}>Contact</Title>

        <Text c="dimmed" ta="center">
          Une question, une suggestion ou un problème ?  
          Contactez-nous directement via l'un des canaux ci-dessous.
        </Text>

        <Paper
          withBorder
          radius="md"
          p="xl"
          w="100%"
        >
          <Group justify="center" gap="xl">
            {/* WhatsApp */}
            <ActionIcon
              component="a"
              href="https://wa.me/2250574093119"
              target="_blank"
              size="xl"
              radius="xl"
              variant="light"
              style={{ transition: 'transform 0.2s' }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <IconBrandWhatsapp size={28} />
            </ActionIcon>

            {/* LinkedIn */}
            <ActionIcon
              component="a"
              href="https://www.linkedin.com/in/kadjo-junior-n’guetta-1024ba378"
              target="_blank"
              size="xl"
              radius="xl"
              variant="light"
              style={{ transition: 'transform 0.2s' }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <IconBrandLinkedin size={28} />
            </ActionIcon>

            {/* Email */}
           <ActionIcon
  component="a"
  href="https://mail.google.com/mail/?view=cm&fs=1&to=junior27nguetta@gmail.com"
  target="_blank"
  size="xl"
  radius="xl"
  variant="light"
  style={{ transition: 'transform 0.2s' }}
  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
>
  <IconMail size={28} />
</ActionIcon>

          </Group>
        </Paper>

        <Text size="sm" c="dimmed" ta="center">
          Nous vous répondrons dans les plus brefs délais.
        </Text>
      </Stack>
    </Container>
    <Footer />
    </>
  );
}