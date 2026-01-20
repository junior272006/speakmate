import { 
  Box, 
  Container, 
  SimpleGrid, 
  Stack, 
  Text, 
  useMantineColorScheme 
} from '@mantine/core';

import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import classes from './Footer.module.css';

export default function Footer() {
  const { colorScheme } = useMantineColorScheme();
  const navigate = useNavigate();

  const bgGradient =
    colorScheme === 'dark'
      ? 'linear-gradient(135deg, var(--mantine-color-dark-9), var(--mantine-color-dark-7))'
      : 'linear-gradient(135deg, var(--mantine-color-brandBlue-6), var(--mantine-color-brandRed-5))';

  const textColor =
    colorScheme === 'dark'
      ? 'var(--mantine-color-gray-3)'
      : 'white';

  const hoverColor = 'var(--mantine-color-brandRed-5)';

  const quickLinks = [
    { label: 'Accueil', to: '/' },
    { label: 'Tuteurs', to: '/#tuteurs' },
    { label: 'Devenir tuteur', to: '/signup' },
    { label: 'Rapport', to: '/login' },
  ];

  const infoLinks = [
    { label: 'Contact', to: '/contact' },
    { label: 'FAQ', to: '/faq' },
    { label: 'Politique de confidentialité', to: '/privacy' },
  ];

  return (
    <Box component="footer" py={50} style={{ background: bgGradient, width: '100%' }}>
      <Container size="xl">
        <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="xl">

          {/* =================== LOGO & DESCRIPTION =================== */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Stack gap="xs" className={classes.footerStack}>
              <Text fw={700} c={textColor} size="lg">
                SpeakMate
              </Text>
              <Text c={textColor} size="sm">
                La plateforme idéale pour trouver un tuteur et progresser efficacement en anglais.
              </Text>
            </Stack>
          </motion.div>

          {/* =================== LIENS RAPIDES =================== */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Stack gap="xs" className={classes.footerStack}>
              <Text fw={600} c={textColor}>Liens rapides</Text>
              {quickLinks.map((link) => (
                <Text
                  key={link.label}
                  component="a"
                  c={textColor}
                  size="sm"
                  styles={{
                    root: {
                      textDecoration: 'none',
                      cursor: 'pointer',
                      transition: 'color 0.2s ease',
                      ':hover': { color: hoverColor },
                    },
                  }}
                  onClick={() => navigate(link.to)}
                >
                  {link.label}
                </Text>
              ))}
            </Stack>
          </motion.div>

          {/* =================== INFORMATIONS =================== */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Stack gap="xs" className={classes.footerStack}>
              <Text fw={600} c={textColor}>Informations</Text>
              {infoLinks.map((info) => (
                <Text
                  key={info.label}
                  component="a"
                  c={textColor}
                  size="sm"
                  styles={{
                    root: {
                      textDecoration: 'none',
                      cursor: 'pointer',
                      transition: 'color 0.2s ease',
                      ':hover': { color: hoverColor },
                    },
                  }}
                  onClick={() => navigate(info.to)}
                >
                  {info.label}
                </Text>
              ))}
            </Stack>
          </motion.div>

        </SimpleGrid>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Text ta="center" mt={40} c={textColor} size="xs">
            © 2026 SpeakMate — Tous droits réservés
          </Text>
        </motion.div>
      </Container>
    </Box>
  );
}