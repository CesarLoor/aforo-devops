--
-- PostgreSQL database dump
--


-- Dumped from database version 17.12 (Debian 17.12-1.pgdg13+1)
-- Dumped by pg_dump version 17.12 (Debian 17.12-1.pgdg13+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: rol; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.rol (id_rol, nombre, descripcion, estado) VALUES ('c4a03193-937a-4e19-a53d-65cfb5a8067f', 'ASISTENTE', 'Compra entradas y consulta sus tickets', true);
INSERT INTO public.rol (id_rol, nombre, descripcion, estado) VALUES ('e445667c-c250-4696-bd8e-bb12251dbb91', 'ORGANIZADOR', 'Publica y administra sus eventos', true);
INSERT INTO public.rol (id_rol, nombre, descripcion, estado) VALUES ('6307fe6e-3c97-4623-a1e8-f7d407410409', 'ACCESO', 'Valida tickets en la puerta del evento', true);
INSERT INTO public.rol (id_rol, nombre, descripcion, estado) VALUES ('7bced331-9f26-4252-86b4-f84acaf35f1a', 'ADMIN', 'Administra cuentas y roles', true);


--
-- PostgreSQL database dump complete
--


