import React from 'react';
import {
  Box,
  Burger,
  Button,
  Drawer,
  Group,
  ScrollArea,
  Text,
  Stack,
  ActionIcon,
  useMantineColorScheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconHome, IconUsers, IconSun, IconMoon } from '@tabler/icons-react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import classes from './Header.module.css';

interface NavLinkProps {
  icon: React.ComponentType<{ size?: number }>;
  children: React.ReactNode;
  href: string;
  onClick?: () => void;
}

export default function Header() {
  const navigate = useNavigate();
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  // Composant NavLink
  const NavLink: React.FC<NavLinkProps> = ({ icon: Icon, children, href, onClick }) => (
    <motion.div
      className={classes.link}
      onClick={(e) => {
        e.preventDefault(); // empêche le href par défaut
        if (onClick) onClick(); // ex: fermer le drawer
        navigate(href); // navigation interne
      }}
      whileHover={{ scale: 1.03 }}
      transition={{ type: 'spring', stiffness: 300 }}
      style={{ cursor: 'pointer' }}
    >
      <Group gap={8}>
        <Icon size={18} />
        <Text size="sm" fw={500}>
          {children}
        </Text>
      </Group>
    </motion.div>
  );

  return (
    <Box>
      {/* -------------------- HEADER -------------------- */}
      <motion.header
        className={classes.header}
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <Group justify="space-between" h="100%">
          {/* LOGO */}
          <Stack gap={0}>
            <motion.div whileHover={{ scale: 1.02 }}>
              <Text fw={700} size="lg" c="brandBlue.5">
                SpeakMate
              </Text>
              <Text size="xs" c="neutral.6">
                Trouve ton tuteur facilement
              </Text>
            </motion.div>
          </Stack>

          {/* ---------------- DESKTOP LINKS ---------------- */}
          <Group h="100%" gap="xs" visibleFrom="sm">
            <NavLink icon={IconHome} href="/">
              Accueil
            </NavLink>
            <NavLink icon={IconUsers} href="#tuteurs">
              Tuteurs
            </NavLink>
            <NavLink icon={IconUsers} href="/signup">
              Devenir Tuteur
            </NavLink>
          </Group>

          {/* ---------------- DESKTOP ACTIONS ---------------- */}
          <Group visibleFrom="sm" gap="xs">
            <ActionIcon
              onClick={toggleColorScheme}
              variant="default"
              size="lg"
              radius="md"
              aria-label="Toggle color scheme"
            >
              {colorScheme === 'dark' ? <IconSun size={18} /> : <IconMoon size={18} />}
            </ActionIcon>

            <Button color="brandBlue" radius="md" size="sm"  onClick={() => navigate("/login")}  >
              Se Connecter
            </Button>
          </Group>

          {/* ---------------- MOBILE BURGER ---------------- */}
          <Box hiddenFrom="sm">
            <Burger opened={drawerOpened} onClick={toggleDrawer} color="var(--mantine-color-brandBlue-5)" />
          </Box>
        </Group>
      </motion.header>

      {/* ---------------- MOBILE DRAWER ---------------- */}
      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="75%"
        padding="md"
        hiddenFrom="sm"
        zIndex={1000000}
        position="right"
        classNames={{
          body: classes.drawerBody,
          content: classes.drawerContent,
          header: classes.drawerHeader,
        }}
        transitionProps={{ transition: 'slide-left', duration: 250 }}
      >
        <ScrollArea h="calc(100vh - 80px)" mx="-md">
          <Stack gap="xs" px="md">
            <NavLink icon={IconHome} href="/" onClick={closeDrawer}>
              Accueil
            </NavLink>
            <NavLink icon={IconUsers} href="#tuteurs" onClick={closeDrawer}>
              Tuteurs
            </NavLink>
            <NavLink icon={IconUsers} href="/signup" onClick={closeDrawer}>
              Devenir Tuteur
            </NavLink>
          </Stack>

          <Stack gap="sm" px="md" mt="md">
            <Group justify="center" mb="sm">
              <ActionIcon
                onClick={toggleColorScheme}
                variant="default"
                size="xl"
                radius="md"
                aria-label="Toggle color scheme"
              >
                {colorScheme === 'dark' ? <IconSun size={20} /> : <IconMoon size={20} />}
              </ActionIcon>
            </Group>

            <Button color="brandBlue" fullWidth radius="md"  onClick={() => navigate("/login")}>
              Se Connecter
            </Button>
          </Stack>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
