import { 
  Box, 
  Container, 
  SimpleGrid, 
  Stack, 
  Text, 
  Group, 
  ActionIcon, 
  useMantineColorScheme 
} from '@mantine/core';

import { 
  IconBrandFacebook, 
  IconBrandLinkedin, 
  IconBrandInstagram, 
  IconBrandTwitter 
} from '@tabler/icons-react';

import { motion } from 'framer-motion';
import classes from './Footer.module.css';

export default function Footer() {
  const { colorScheme } = useMantineColorScheme();

  // Gradient SpeakMate (BLEU → ROUGE)
  const bgGradient =
    colorScheme === 'dark'
      ? 'linear-gradient(135deg, var(--mantine-color-dark-9), var(--mantine-color-dark-7))'
      : 'linear-gradient(135deg, var(--mantine-color-brandBlue-6), var(--mantine-color-brandRed-5))';

  const textColor =
    colorScheme === 'dark'
      ? 'var(--mantine-color-gray-3)'
      : 'white';

  const hoverColor = 'var(--mantine-color-brandRed-5)';

  return (
    <Box component="footer" py={50} px={20} style={{ background: bgGradient }}>
      <Container size="lg">
        <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="xl">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Stack gap="xs" className={classes.footerStack}>
              <Text fw={700} c={textColor}>
                SpeakMate
              </Text>
              <Text c={textColor} size="sm">
                La plateforme idéale pour trouver un tuteur et progresser efficacement en anglais.
              </Text>
            </Stack>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Stack gap="xs" className={classes.footerStack}>
              <Text fw={600} c={textColor}>Liens rapides</Text>
              {['Accueil', 'Tuteurs', 'Devenir tuteur', 'Connexion'].map((link) => (
                <Text
                  key={link}
                  component="a"
                  href="#"
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
                >
                  {link}
                </Text>
              ))}
            </Stack>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Stack gap="xs" className={classes.footerStack}>
              <Text fw={600} c={textColor}>Informations</Text>
              {['Contact', 'FAQ', 'Politique de confidentialité'].map((info) => (
                <Text
                  key={info}
                  component="a"
                  href="#"
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
                >
                  {info}
                </Text>
              ))}
            </Stack>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Stack gap="xs" className={classes.footerStack}>
              <Text fw={600} c={textColor}>Réseaux sociaux</Text>
              <Group gap="sm" className={classes.footerGroup}>
                <ActionIcon variant="filled" color="brandBlue" component="a" href="#">
                  <IconBrandFacebook size={20} color="white" />
                </ActionIcon>
                <ActionIcon variant="filled" color="brandBlue" component="a" href="#">
                  <IconBrandLinkedin size={20} color="white" />
                </ActionIcon>
                <ActionIcon variant="filled" color="brandRed" component="a" href="#">
                  <IconBrandInstagram size={20} color="white" />
                </ActionIcon>
                <ActionIcon variant="filled" color="brandRed" component="a" href="#">
                  <IconBrandTwitter size={20} color="white" />
                </ActionIcon>
              </Group>
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
