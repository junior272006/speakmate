import {
  Container,
  Title,
  Text,
  Button,
  Group,
  SimpleGrid,
  Card,
  ThemeIcon,
  Stack,
  Box,
useMantineColorScheme,
} from "@mantine/core";
import { IconUsers,IconMessage,IconCalendar,IconBriefcase,IconSchool} from '@tabler/icons-react';
import { motion } from "motion/react";
import Header from "../../components/common/Header"
import Footer from "../../components/common/Footer";
import classes from "./Home.module.css";
export default function Home () {

     const { colorScheme } = useMantineColorScheme();
    return (
        <>
        <Header/>
       <Box>
  {/* ================= HERO ================= */}
  <Box
    py={80}
    style={{
      marginTop: '64px',
      background:
        colorScheme === "dark"
          ? "linear-gradient(135deg, var(--mantine-color-dark-9), var(--mantine-color-dark-7))"
          : "linear-gradient(135deg, var(--mantine-color-brandOrange-5), var(--mantine-color-brandBlue-4))", // <-- dégradé orange → bleu clair
    }}
  >
    <Container size="lg">
      <Stack align="center" gap="lg">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Title ta="center" c="white" className={classes.heroTitle}>
            Trouvez votre tuteur idéal en quelques clics
          </Title>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Text ta="center" c="white" maw={600} className={classes.heroText}>
            SpeakMate vous met en relation avec des tuteurs expérimentés pour améliorer votre anglais et progresser rapidement.
          </Text>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Group className={classes.heroButtons}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button size="md" radius="md" color="brandOrange">
                Trouver un tuteur
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button size="md" radius="md" variant="outline" color="brandBlue"> {/* <-- bouton bleu */}
                Devenir tuteur
              </Button>
            </motion.div>
          </Group>
        </motion.div>
      </Stack>
    </Container>
  </Box>

  {/* ================= STATS ================= */}
  <Container size="lg" py={60}>
    <SimpleGrid cols={{ base: 2, sm: 4 }} spacing="lg">
      {[
        { label: "Tuteurs", value: "+200" },
        { label: "Étudiants", value: "+1 500" },
        { label: "Cours disponibles", value: "120" },
        { label: "Pays", value: "8" },
      ].map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          viewport={{ once: true }}
        >
          <Card radius="md" withBorder className={classes.statCard}>
            <Title order={3} ta="center" c={index % 2 === 0 ? "brandOrange.6" : "brandBlue.6"}> {/* <-- texte alterné orange/bleu */}
              {stat.value}
            </Title>
            <Text ta="center" c="dimmed" size="sm">
              {stat.label}
            </Text>
          </Card>
        </motion.div>
      ))}
    </SimpleGrid>
  </Container>

  {/* ================= FEATURES ================= */}
  <Container size="lg" py={60}>
    <Title ta="center" mb="xl">
      Ce que vous pouvez faire
    </Title>

    <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
      {[
        {
          icon: IconUsers,
          title: "Choisir un tuteur",
          text: "Parcourez les profils et choisissez le tuteur qui correspond à vos besoins.",
        },
        {
          icon: IconMessage,
          title: "Échanger facilement",
          text: "Communiquez directement avec votre tuteur pour planifier vos cours.",
        },
        {
          icon: IconCalendar,
          title: "Planifier vos cours",
          text: "Organisez vos séances selon vos disponibilités et vos objectifs.",
        },
        {
          icon: IconBriefcase,
          title: "Suivre vos progrès",
          text: "Recevez des feedbacks réguliers pour améliorer votre niveau rapidement.",
        },
        {
          icon: IconSchool,
          title: "Découvrir des ressources",
          text: "Accédez à des supports pédagogiques pour compléter vos apprentissages.",
        },
      ].map((feature, index) => (
        <motion.div
          key={feature.title}
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ y: -6 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          viewport={{ once: true }}
        >
          <Card radius="md" withBorder h="100%" className={classes.featureCard}>
            <ThemeIcon size="lg" radius="md" color={index % 2 === 0 ? "brandOrange" : "brandBlue"} mb="sm"> {/* <-- icône orange/bleu alterné */}
              <feature.icon size={20} />
            </ThemeIcon>

            <Title order={4}>{feature.title}</Title>
            <Text size="sm" c="dimmed">
              {feature.text}
            </Text>
          </Card>
        </motion.div>
      ))}
    </SimpleGrid>
  </Container>

  {/* ================= CTA FINAL ================= */}
  <Box py={80} bg="brandOrange.6">
    <Container size="sm">
      <Stack align="center">
        <Title ta="center" c="white">
          Rejoignez SpeakMate dès maintenant
        </Title>
        <Text ta="center" c="white">
          Inscription rapide et gratuite
        </Text>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button size="md" variant="outline" color="brandBlue"> {/* <-- bouton bleu */}
            Créer un compte
          </Button>
        </motion.div>
      </Stack>
    </Container>
  </Box>
</Box>
<Footer/>

        </>
    )
}