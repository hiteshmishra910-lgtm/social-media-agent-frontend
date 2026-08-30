import Settings from "./setting.jsx";
import Login from "./login.jsx";
import Register from "./register.jsx";
import React, { useEffect, useMemo, useState } from "react";

/* =========================================================
   CONFIG
========================================================= */

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";
const USER_ID = 1;
const DEFAULT_BRAND_ID = 1;
const REQUEST_TIMEOUT_MS = 45000;
const SCHEDULE_STORAGE_KEY = "socialai_scheduled_content";

/* =========================================================
   GLOBAL CSS
========================================================= */

const styles = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,500;0,600;1,500;1,600&display=swap');

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  background: #f4f1e8;
  color: #151b17;
  font-family: "DM Sans", Arial, sans-serif;
}

button,
input,
textarea,
select {
  font: inherit;
}

button {
  cursor: pointer;
}

.app {
  min-height: 100vh;
  background:
    radial-gradient(
      circle at 80% 5%,
      rgba(111, 157, 124, 0.16),
      transparent 28%
    ),
    radial-gradient(
      circle at 5% 80%,
      rgba(191, 205, 188, 0.18),
      transparent 25%
    ),
    #f4f1e8;
}

/* =========================================================
   NAVBAR
========================================================= */

.top-nav {
  position: sticky;
  top: 15px;
  z-index: 100;

  width: calc(100% - 40px);
  max-width: 1450px;

  margin: 15px auto 0;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}

.logo-area {
  min-width: 190px;

  display: flex;
  align-items: center;
  gap: 12px;
}

.logo-mark {
  width: 48px;
  height: 48px;

  border-radius: 50%;

  display: flex;
  align-items: center;
  justify-content: center;

  background: #4f8164;
  color: white;

  font-size: 22px;

  box-shadow:
    0 10px 25px rgba(59, 93, 70, 0.22);
}

.logo-name {
  font-size: 21px;
  font-weight: 800;
  letter-spacing: -0.8px;
}

.logo-subtitle {
  color: #6d756f;
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 1.7px;
}

.nav-pill {
  display: flex;
  align-items: center;
  gap: 3px;

  padding: 5px;

  border: 1px solid rgba(32, 47, 38, 0.11);
  border-radius: 999px;

  background: rgba(250, 248, 240, 0.9);

  backdrop-filter: blur(18px);

  box-shadow:
    0 8px 35px rgba(43, 54, 45, 0.08);
}

.nav-button {
  border: 0;
  background: transparent;

  color: #48504a;

  padding: 11px 17px;
  border-radius: 999px;

  transition: 0.2s ease;
}

.nav-button:hover {
  background: rgba(79, 129, 100, 0.08);
}

.nav-button.active {
  background: #d8e3d7;
  color: #173421;
  font-weight: 700;
}

.nav-actions {
  min-width: 190px;

  display: flex;
  justify-content: flex-end;
  gap: 8px;
}

.circle-btn {
  width: 43px;
  height: 43px;

  border-radius: 50%;

  border: 1px solid rgba(32, 47, 38, 0.12);

  background: rgba(250, 248, 240, 0.9);
  color: #1d2921;

  transition: 0.2s ease;
}

.circle-btn:hover {
  transform: rotate(15deg);
}

.contact-btn {
  border: 1px solid rgba(32, 47, 38, 0.15);

  background: #4f8164;
  color: white;

  border-radius: 999px;

  padding: 12px 20px;

  font-weight: 700;
}

/* =========================================================
   MAIN
========================================================= */

.main {
  width: calc(100% - 40px);
  max-width: 1450px;

  margin: 0 auto;

  padding: 70px 0 60px;
}

/* =========================================================
   HERO
========================================================= */

.hero {
    min-height: 680px;

    display: grid;
    grid-template-columns: 0.95fr 1.05fr;

    gap: 70px;

    align-items: center;

    position: relative;
    overflow: hidden;

    padding: 70px 55px;

    border-radius: 36px;

    background:
        radial-gradient(
            circle at 88% 18%,
            rgba(190, 210, 185, 0.75) 0,
            rgba(190, 210, 185, 0.75) 115px,
            transparent 116px
        ),
        #f3f1e8;

    border: 1px solid rgba(34, 49, 39, 0.10);
}

.hero-copy {
    padding-left: 0;

    position: relative;

    z-index: 5;

    max-width: 650px;
}

.eyebrow {
  display: flex;
  align-items: center;
  gap: 12px;

  color: #607d69;

  font-size: 10px;
  font-weight: 700;

  letter-spacing: 2.8px;

  margin-bottom: 24px;
}

.eyebrow-line {
  width: 48px;
  height: 1px;
  background: #7d9d84;
}

.hero-title {
  margin: 0;

  max-width: 720px;

  font-size: clamp(58px, 6vw, 100px);

  line-height: 0.88;

  letter-spacing: -5px;

  font-weight: 800;
}

.hero-title {
  margin: 0;

  max-width: 720px;

  font-size: clamp(58px, 6vw, 100px);

  line-height: 0.9;

  letter-spacing: -5px;

  font-weight: 800;
}

.hero-title em {
  display: block;

  font-family:
    "Playfair Display",
    Georgia,
    serif;

  font-weight: 500;
  font-style: italic;

  letter-spacing: -4px;
}

.green-text {
  color: #4f8969;
}

.hero-description {
  max-width: 570px;

  margin: 30px 0;

  font-size: 17px;

  line-height: 1.65;

  color: #59635c;
}

.hero-actions {
  display: flex;
  gap: 12px;
  align-items: center;
}

.primary-btn {
  border: 0;

  background: #1c2a20;
  color: white;

  border-radius: 12px;

  padding: 15px 23px;

  font-weight: 700;

  box-shadow:
    0 12px 28px rgba(28, 42, 32, 0.18);

  transition: 0.2s ease;
}

.primary-btn:hover {
  transform: translateY(-3px);
  background: #304a38;
}

.secondary-btn {
  border: 1px solid rgba(31, 46, 37, 0.15);

  background: rgba(248, 245, 236, 0.7);

  color: #27342c;

  border-radius: 12px;

  padding: 14px 22px;

  font-weight: 600;

  transition: 0.2s ease;
}

.secondary-btn:hover {
  transform: translateY(-2px);
}

.hero-note {
  margin-top: 22px;

  color: #707972;

  font-size: 11px;

  letter-spacing: 0.7px;
}

/* =========================================================
   HERO VISUAL
========================================================= */

.hero-visual {
  min-height: 540px;

  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;

  overflow: visible;
}

.green-orb {
  position: absolute;

  width: 465px;
  height: 465px;

  border-radius: 50%;

  background:
    radial-gradient(
      circle at 30% 22%,
      #d7e4d5 0%,
      #b5cdb7 25%,
      #86aa8d 58%,
      #5c8165 100%
    );

  box-shadow:
    inset 25px 20px 50px rgba(255, 255, 255, 0.3),
    inset -30px -35px 60px rgba(47, 76, 57, 0.2),
    0 35px 80px rgba(65, 90, 70, 0.2);

  animation: orbFloat 5s ease-in-out infinite;
}

.green-orb::before {
  content: "";

  position: absolute;

  width: 125px;
  height: 80px;

  left: 75px;
  top: 55px;

  border-radius: 50%;

  background: rgba(255, 255, 255, 0.28);

  filter: blur(10px);

  transform: rotate(-25deg);
}

.dark-orb {
  position: absolute;

  width: 155px;
  height: 155px;

  right: 0;
  bottom: 25px;

  border-radius: 50%;

  background:
    radial-gradient(
      circle at 30% 25%,
      #bd8c68,
      #805337 55%,
      #4d2e20 100%
    );

  box-shadow:
    inset -15px -20px 30px rgba(45, 22, 12, 0.28),
    0 25px 50px rgba(69, 42, 28, 0.2);

  animation: smallOrbFloat 4s ease-in-out infinite;
}

/* =========================================================
   PREVIEW CARD
========================================================= */

.preview-card {
  width: min(560px, 88%);
  height: 350px;

  position: relative;
  z-index: 5;

  border-radius: 25px;

  padding: 28px;

  background:
    radial-gradient(
      circle at 90% 8%,
      rgba(139, 82, 45, 0.5),
      transparent 30%
    ),
    linear-gradient(
      145deg,
      #1a1916,
      #080807
    );

  box-shadow:
    0 40px 80px rgba(25, 28, 25, 0.27);

  transform: rotate(-3deg);

  transition: 0.3s ease;
}

.preview-card:hover {
  transform:
    rotate(-1deg)
    translateY(-6px);
}

.preview-top {
  display: flex;
  align-items: center;
  justify-content: space-between;

  color: #cbd4c9;

  font-size: 10px;

  letter-spacing: 2px;
}

.preview-top span:last-child {
  color: #91b79a;
}

.preview-content {
  position: absolute;

  left: 55px;
  right: 55px;

  top: 125px;
}

.preview-small {
  color: #8eaa95;

  font-size: 10px;

  letter-spacing: 2px;

  margin-bottom: 12px;
}

.preview-heading {
  color: white;

  font-size: 43px;

  line-height: 0.98;

  letter-spacing: -2px;

  margin: 0 0 22px;
}

.preview-search {
  height: 53px;

  border:
    1px solid rgba(218, 232, 218, 0.45);

  border-radius: 13px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0 16px;

  color: #aeb7ae;

  font-size: 13px;
}

.preview-arrow {
  color: #82b48f;
  font-size: 22px;
}

/* =========================================================
   GENERATOR
========================================================= */

.generator-section {
  margin-top: 50px;

  border-radius: 30px;

  padding: 50px;

  background: #e5eadf;

  border:
    1px solid rgba(49, 73, 57, 0.1);

  position: relative;

  overflow: hidden;
}

.generator-section::before {
  content: "";

  position: absolute;

  width: 380px;
  height: 380px;

  right: -160px;
  top: -180px;

  border-radius: 50%;

  background: rgba(116, 151, 124, 0.18);
}

.section-label {
  font-size: 10px;

  font-weight: 700;

  letter-spacing: 2.5px;

  text-transform: uppercase;

  color: #66806d;

  margin-bottom: 15px;
}

.section-title {
  margin: 0;

  font-size: clamp(40px, 4vw, 65px);

  line-height: 0.94;

  letter-spacing: -3px;

  font-weight: 800;
}

.section-title em {
  font-family:
    "Playfair Display",
    Georgia,
    serif;

  font-weight: 500;
}

.section-description {
  max-width: 650px;

  color: #5c665f;

  margin: 18px 0 35px;

  font-size: 15px;

  line-height: 1.65;
}

.generator-form {
  position: relative;
  z-index: 2;

  display: grid;

  grid-template-columns:
    1fr
    210px
    145px;

  gap: 12px;

  align-items: end;
}

.field-label {
  display: block;

  font-size: 10px;

  text-transform: uppercase;

  letter-spacing: 1.5px;

  color: #657269;

  margin-bottom: 8px;
}

.topic-input,
.platform-select {
  width: 100%;

  height: 58px;

  border:
    1px solid rgba(38, 57, 45, 0.14);

  background: #f8f5ec;

  border-radius: 13px;

  padding: 0 17px;

  color: #172019;

  outline: none;
}

.topic-input:focus,
.platform-select:focus {
  border-color: #5f8a6c;

  box-shadow:
    0 0 0 3px rgba(95, 138, 108, 0.1);
}

.social-post-input {
  min-height: 150px;
  height: 150px;
  resize: vertical;
  padding: 16px 17px;
  line-height: 1.5;
  display: block;
}

.generated-preview {
  position: relative;
  z-index: 2;
  margin-top: 22px;
  padding: 24px;
  border-radius: 20px;
  background: rgba(248, 245, 236, 0.78);
  border: 1px solid rgba(38, 57, 45, 0.11);
}

.generated-preview-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
  margin-bottom: 18px;
}

.generated-preview-title {
  margin: 0;
  font-size: 21px;
  letter-spacing: -0.5px;
}

.generated-preview-platform {
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 1.2px;
  color: #557060;
  background: #e1e9df;
  padding: 7px 10px;
  border-radius: 999px;
}

.generated-preview-block {
  margin-top: 15px;
}

.generated-preview-label {
  display: block;
  margin-bottom: 7px;
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 1.4px;
  color: #657269;
  font-weight: 700;
}

.generated-preview-text {
  white-space: pre-wrap;
  color: #263229;
  font-size: 14px;
  line-height: 1.65;
}

.generate-btn {
  height: 58px;

  border: 0;

  border-radius: 13px;

  background: #1b2a20;

  color: white;

  font-weight: 700;

  transition: 0.2s ease;
}

.generate-btn:hover {
  transform: translateY(-2px);

  background: #304a38;
}

.generate-btn:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}

.message {
  position: relative;
  z-index: 2;

  margin-top: 16px;

  padding: 13px 16px;

  border-radius: 12px;

  font-size: 13px;

  background: rgba(255, 255, 255, 0.55);

  color: #405147;
}

.message.error {
  color: #8a4138;
  background: #f6dfd9;
}

.message.success {
  color: #376245;
  background: #dcebdc;
}

/* =========================================================
   CONTENT
========================================================= */

.content-section {
  padding: 90px 0 30px;
}

.content-header {
  display: flex;

  align-items: flex-end;

  justify-content: space-between;

  gap: 20px;

  margin-bottom: 25px;
}

.content-header h2 {
  margin: 0;

  font-size: 46px;

  letter-spacing: -2px;
}

.content-header p {
  margin: 7px 0 0;

  color: #69726c;
}

.refresh-button {
  border:
    1px solid rgba(32, 47, 38, 0.15);

  background: #f8f5ec;

  border-radius: 999px;

  padding: 11px 18px;

  color: #2b382f;
}

.refresh-button:disabled {
  opacity: 0.6;
}

.empty-state {
  border:
    1px dashed rgba(48, 71, 56, 0.22);

  border-radius: 24px;

  padding: 70px 25px;

  text-align: center;

  background:
    rgba(250, 248, 240, 0.5);
}

.empty-mark {
  width: 58px;
  height: 58px;

  border-radius: 50%;

  background: #d9e4d7;

  color: #4f8164;

  margin: 0 auto 18px;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 25px;
}

.empty-state h3 {
  margin: 0 0 8px;

  font-size: 23px;
}

.empty-state p {
  margin: 0;

  color: #727a75;
}

.content-grid {
  display: grid;
.content-card {
  background: #f8f5ec;

  border:
    1px solid rgba(34, 49, 39, 0.1);

  border-radius: 20px;

  padding: 22px;

  min-height: 240px;

  display: flex;

  flex-direction: column;

  transition: 0.2s ease;
}

  box-shadow:
    0 12px 35px rgba(34, 49, 39, 0.06);
}
.content-card:hover {
  transform: translateY(-4px);

  box-shadow:
    0 18px 40px rgba(49, 57, 48, 0.08);
}

.content-card-top {
  display: flex;

  align-items: center;

  justify-content: space-between;

  gap: 10px;
}

.platform-badge {
  font-size: 10px;

  letter-spacing: 1px;

  text-transform: uppercase;

  color: #557060;

  background: #e1e9df;

  padding: 7px 10px;

  border-radius: 999px;
}

.status-badge {
  font-size: 10px;

  letter-spacing: 0.8px;

  text-transform: uppercase;

  padding: 7px 10px;

  border-radius: 999px;

  background: #edf0e9;

  color: #5d685f;
}

.content-card h3 {
  margin: 25px 0 10px;

  font-size: 21px;

  line-height: 1.15;

  letter-spacing: -0.7px;
}

.content-preview {
  color: #69716b;

  font-size: 13px;

  line-height: 1.55;

  display: -webkit-box;

  -webkit-line-clamp: 5;

  -webkit-box-orient: vertical;

  overflow: hidden;
}

.card-footer {
  margin-top: auto;

  padding-top: 18px;

  display: flex;

  align-items: center;

  justify-content: space-between;

  border-top:
    1px solid rgba(40, 54, 44, 0.08);
}

.date {
  font-size: 11px;
  color: #7b837d;
}

.card-actions {
  display: flex;
  gap: 6px;
}

.small-button {
  border:
    1px solid rgba(36, 53, 42, 0.12);

  background: transparent;

  border-radius: 9px;

  padding: 7px 10px;

  font-size: 11px;

  color: #35433a;
}

.small-button:hover {
  background: #e8ece4;
}

.small-button.delete {
  color: #98544c;
}

/* =========================================================
   SERVICES
========================================================= */

.services {
  padding: 100px 0;

  display: grid;

  grid-template-columns:
    0.8fr
    1.2fr;

  gap: 70px;
}

.services-left h2 {
  margin: 0;

  font-size:
    clamp(48px, 5vw, 78px);

  line-height: 0.92;

  letter-spacing: -4px;
}

.services-left h2 em {
  display: block;

  font-family:
    "Playfair Display",
    Georgia,
    serif;

  font-weight: 500;
}

.services-left p {
  max-width: 470px;

  margin-top: 25px;

  color: #626b64;

  line-height: 1.6;
}

.feature-list {
  border-top:
    1px solid rgba(39, 55, 44, 0.15);
}

.feature-row {
  min-height: 105px;

  border-bottom:
    1px solid rgba(39, 55, 44, 0.15);

  display: flex;

  align-items: center;

  justify-content: space-between;

  gap: 20px;

  transition: 0.2s ease;
}

.feature-row:hover {
  padding-left: 12px;
}

.feature-number {
  color: #718078;

  font-size: 10px;

  letter-spacing: 2px;
}

.feature-name {
  flex: 1;

  font-size:
    clamp(28px, 3vw, 48px);

  letter-spacing: -2px;
}

.feature-name.green {
  color: #60916e;
}

.feature-meta {
  color: #6c756e;

  font-size: 10px;

  letter-spacing: 1px;
}

/* =========================================================
   CALENDAR
========================================================= */

.calendar-section {
  padding: 45px 0 40px;
}

.calendar-shell {
  background: rgba(248, 245, 236, 0.78);

  border:
    1px solid rgba(34, 49, 39, 0.1);

  border-radius: 26px;

  overflow: hidden;

  box-shadow:
    0 20px 60px rgba(45, 57, 48, 0.06);
}

.calendar-toolbar {
  padding: 24px 26px;

  display: flex;

  align-items: center;

  justify-content: space-between;

  gap: 20px;

  border-bottom:
    1px solid rgba(34, 49, 39, 0.09);
}

.calendar-title {
  display: flex;

  align-items: center;

  gap: 18px;
}

.calendar-title h2 {
  margin: 0;

  font-size: 30px;

  letter-spacing: -1.5px;
}

.calendar-title p {
  margin: 4px 0 0;

  color: #707972;

  font-size: 12px;
}

.calendar-controls {
  display: flex;

  align-items: center;

  gap: 7px;
}

.calendar-control {
  width: 40px;
  height: 40px;

  border:
    1px solid rgba(36, 53, 42, 0.12);

  border-radius: 10px;

  background: #f8f5ec;

  color: #2d3a31;

  transition: 0.2s ease;
}

.calendar-control:hover {
  background: #e4ebe1;
}

.today-button {
  padding: 10px 15px;

  border:
    1px solid rgba(36, 53, 42, 0.12);

  border-radius: 10px;

  background: #1b2a20;

  color: white;

  font-size: 12px;

  font-weight: 700;
}

.calendar-weekdays {
  display: grid;

  grid-template-columns:
    repeat(7, 1fr);

  background: #e9eee6;

  border-bottom:
    1px solid rgba(34, 49, 39, 0.08);
}

.calendar-weekday {
  padding: 13px 10px;

  color: #69746c;

  font-size: 10px;

  font-weight: 700;

  text-transform: uppercase;

  letter-spacing: 1.3px;
}

.calendar-grid {
  display: grid;

  grid-template-columns:
    repeat(7, 1fr);
}

.calendar-day {
  min-height: 145px;

  padding: 11px;

  background: rgba(248, 245, 236, 0.78);

  border-right:
    1px solid rgba(34, 49, 39, 0.07);

  border-bottom:
    1px solid rgba(34, 49, 39, 0.07);

  transition: 0.15s ease;

  position: relative;
}

.calendar-day:nth-child(7n) {
  border-right: 0;
}

.calendar-day:hover {
  background: #f0eee5;
}

.calendar-day.muted {
  background: rgba(235, 232, 222, 0.4);
}

.calendar-day-number {
  width: 29px;
  height: 29px;

  border-radius: 50%;

  display: flex;

  align-items: center;
  justify-content: center;

  color: #556158;

  font-size: 12px;

  margin-bottom: 7px;
}

.calendar-day.today
  .calendar-day-number {
  background: #4f8164;

  color: white;

  font-weight: 700;

  box-shadow:
    0 5px 12px rgba(79, 129, 100, 0.22);
}

.calendar-events {
  display: flex;

  flex-direction: column;

  gap: 5px;
}

.calendar-event {
  width: 100%;

  border: 0;

  border-radius: 8px;

  padding: 7px 8px;

  text-align: left;

  background: #dce8da;

  color: #294232;

  font-size: 10px;

  line-height: 1.3;

  overflow: hidden;

  transition: 0.15s ease;
}

.calendar-event:hover {
  background: #cddfcf;

  transform: translateX(2px);
}

.calendar-event strong {
  display: block;

  font-size: 10px;

  margin-bottom: 2px;
}

.calendar-event span {
  display: block;

  white-space: nowrap;

  overflow: hidden;

  text-overflow: ellipsis;
}

.calendar-event.instagram {
  background: #e5e8d9;
}

.calendar-event.facebook {
  background: #dbe7e4;
}

.calendar-event.linkedin {
  background: #dce4e8;
}

.calendar-event.twitter {
  background: #e4e5e3;
}

.calendar-add {
  width: 100%;

  border:
    1px dashed rgba(65, 89, 72, 0.2);

  background: transparent;

  border-radius: 8px;

  padding: 7px;

  color: #718078;

  font-size: 10px;

  margin-top: 4px;

  opacity: 0;

  transition: 0.15s ease;
}

.calendar-day:hover .calendar-add {
  opacity: 1;
}

.calendar-legend {
  padding: 16px 24px;

  display: flex;

  align-items: center;

  gap: 18px;

  border-top:
    1px solid rgba(34, 49, 39, 0.08);

  color: #68736b;

  font-size: 11px;
}

.legend-item {
  display: flex;

  align-items: center;

  gap: 7px;
}

.legend-dot {
  width: 9px;
  height: 9px;

  border-radius: 50%;

  background: #4f8164;
}

/* =========================================================
   SCHEDULE PANEL
========================================================= */

.schedule-panel {
  margin-top: 20px;

  padding: 25px;

  border-radius: 20px;

  background: #e5eadf;

  border:
    1px solid rgba(49, 73, 57, 0.1);
}

.schedule-panel h3 {
  margin: 0 0 5px;

  font-size: 21px;
}

.schedule-panel p {
  margin: 0 0 18px;

  color: #68736b;

  font-size: 12px;
}

.schedule-list {
  display: flex;

  flex-direction: column;

  gap: 9px;
}

.schedule-item {
  display: flex;

  align-items: center;

  justify-content: space-between;

  gap: 15px;

  padding: 12px 14px;

  border-radius: 12px;

  background: rgba(248, 245, 236, 0.8);
}

.schedule-item-main {
  min-width: 0;
}

.schedule-item-title {
  font-weight: 700;

  font-size: 13px;

  white-space: nowrap;

  overflow: hidden;

  text-overflow: ellipsis;
}

.schedule-item-meta {
  margin-top: 3px;

  color: #718078;

  font-size: 10px;
}

.schedule-remove {
  border: 0;

  background: transparent;

  color: #98544c;

  font-size: 11px;

  padding: 6px;
}

/* =========================================================
   FOOTER
========================================================= */

.footer {
  padding: 35px 0 50px;

  border-top:
    1px solid rgba(39, 55, 44, 0.12);

  display: flex;

  justify-content: space-between;

  color: #68726b;

  font-size: 12px;
}

/* =========================================================
   MODAL
========================================================= */

.modal-backdrop {
  position: fixed;

  inset: 0;

  z-index: 200;

  background:
    rgba(20, 27, 22, 0.52);

  backdrop-filter: blur(8px);

  display: flex;

  align-items: center;

  justify-content: center;

  padding: 25px;
}

.modal {
  width: min(720px, 100%);

  max-height: 85vh;

  overflow: auto;

  border-radius: 25px;

  background: #f7f4eb;

  box-shadow:
    0 35px 100px rgba(0, 0, 0, 0.25);
}

.modal-header {
  padding: 25px 28px;

  border-bottom:
    1px solid rgba(30, 45, 35, 0.1);

  display: flex;

  align-items: center;

  justify-content: space-between;
}

.modal-header h2 {
  margin: 0;

  font-size: 27px;
}

.modal-header p {
  margin: 5px 0 0;

  color: #718078;

  font-size: 13px;
}

.modal-close {
  border: 0;

  background: #e5e9e1;

  width: 38px;
  height: 38px;

  border-radius: 50%;

  font-size: 22px;
}

.modal-body {
  padding: 28px;
}

.detail-block {
  margin-bottom: 23px;
}

.detail-label {
  display: block;

  margin-bottom: 9px;

  font-size: 10px;

  text-transform: uppercase;

  letter-spacing: 1.4px;

  color: #6c786f;
}

.caption-box {
  white-space: pre-wrap;

  line-height: 1.7;

  background: #eeece2;

  border-radius: 14px;

  padding: 18px;

  color: #273129;
}

.detail-grid {
  display: grid;

  grid-template-columns:
    1fr
    1fr;

  gap: 14px;
}

.detail-value {
  background: #eeece2;

  border-radius: 12px;

  padding: 14px;

  color: #354238;
}

.schedule-time-row {
  max-width: 240px;
  margin: 18px 0 20px;
}

.schedule-time-input {
  width: 100%;
  height: 48px;
  border: 1px solid rgba(38, 57, 45, 0.14);
  background: #f8f5ec;
  border-radius: 12px;
  padding: 0 14px;
  color: #172019;
  outline: none;
}

.schedule-time-input:focus {
  border-color: #5f8a6c;
  box-shadow: 0 0 0 3px rgba(95, 138, 108, 0.1);
}

.schedule-time-input:disabled {
  opacity: 0.6;
}

/* =========================================================
   ANIMATIONS
========================================================= */

@keyframes orbFloat {
  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-12px);
  }
}

@keyframes smallOrbFloat {
  0%,
  100% {
    transform: translateY(0) rotate(0deg);
  }

  50% {
    transform: translateY(-10px) rotate(5deg);
  }
}

/* =========================================================
   RESPONSIVE
========================================================= */

@media (max-width: 1100px) {
  .nav-pill {
    display: none;
  }

  .hero {
    grid-template-columns: 1fr;
  }

  .hero-copy {
    padding-left: 0;
  }

  .hero-visual {
    min-height: 470px;
  }

  .generator-form {
    grid-template-columns: 1fr;
  }

  .content-grid {
    grid-template-columns: 1fr 1fr;
  }

  .services {
    grid-template-columns: 1fr;
  }

  .calendar-day {
    min-height: 120px;
  }
}

@media (max-width: 650px) {
  .top-nav {
    width: calc(100% - 24px);
  }

  .logo-subtitle {
    display: none;
  }

  .contact-btn {
    display: none;
  }

  .main {
    width: calc(100% - 24px);
    padding-top: 45px;
  }

  .hero-title {
    font-size: 57px;
    letter-spacing: -3px;
  }

  .hero-title em {
    letter-spacing: -2px;
  }

  .hero-actions {
    flex-wrap: wrap;
  }

  .hero-visual {
    min-height: 350px;
  }

  .green-orb {
    width: 300px;
    height: 300px;
  }

  .preview-card {
    width: 300px;
    height: 245px;
    padding: 20px;
  }

  .preview-content {
    left: 28px;
    right: 28px;
    top: 82px;
  }

  .preview-heading {
    font-size: 30px;
  }

  .preview-search {
    height: 42px;
    font-size: 10px;
  }

  .dark-orb {
    width: 85px;
    height: 85px;
    right: 3%;
    bottom: 10px;
  }

  .generator-section {
    padding: 28px;
  }

  .content-grid {
    grid-template-columns: 1fr;
  }

  .content-header {
    align-items: flex-start;
    flex-direction: column;
  }

  .services {
    padding: 65px 0;
  }

  .feature-row {
    min-height: 90px;
  }

  .feature-meta {
    display: none;
  }

  .footer {
    flex-direction: column;
    gap: 10px;
  }

  .detail-grid {
    grid-template-columns: 1fr;
  }

  .calendar-toolbar {
    align-items: flex-start;

    flex-direction: column;
  }

  .calendar-title {
    width: 100%;

    justify-content: space-between;
  }

  .calendar-grid {
    overflow-x: auto;

    grid-template-columns:
      repeat(7, minmax(105px, 1fr));

    min-width: 735px;
  }

  .calendar-weekdays {
    overflow-x: auto;

    grid-template-columns:
      repeat(7, minmax(105px, 1fr));

    min-width: 735px;
  }

  .calendar-shell {
    overflow-x: auto;
  }

  .calendar-weekdays,
  .calendar-grid {
    width: 100%;
  }

  .calendar-legend {
    flex-wrap: wrap;
  }
}

/* =========================================================
   ANALYTICS DASHBOARD
========================================================= */

.analytics-section {
  padding: 55px 0 40px;
}

.analytics-hero {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 30px;
  margin-bottom: 30px;
}

.analytics-title {
  margin: 0;
  font-size: clamp(46px, 5vw, 78px);
  line-height: .92;
  letter-spacing: -4px;
}

.analytics-title em {
  font-family: "Playfair Display", Georgia, serif;
  font-weight: 500;
}

.analytics-subtitle {
  max-width: 520px;
  margin: 15px 0 0;
  color: #69736c;
  line-height: 1.6;
  font-size: 14px;
}

.analytics-refresh {
  flex-shrink: 0;
}

.analytics-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
  margin-bottom: 18px;
}

.analytics-stat {
  min-height: 150px;
  padding: 23px;
  border-radius: 20px;
  background: #f8f5ec;
  border: 1px solid rgba(34,49,39,.1);
  box-shadow: 0 12px 30px rgba(49,57,48,.04);
}

.analytics-stat-label {
  color: #748078;
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 1.6px;
}

.analytics-stat-number {
  margin-top: 18px;
  font-size: 43px;
  line-height: 1;
  letter-spacing: -2px;
  font-weight: 800;
}

.analytics-stat-note {
  margin-top: 9px;
  color: #6d766f;
  font-size: 11px;
}

.analytics-layout {
  display: grid;
  grid-template-columns: 1.15fr .85fr;
  gap: 18px;
}

.analytics-panel {
  background: #e5eadf;
  border: 1px solid rgba(49,73,57,.1);
  border-radius: 24px;
  padding: 25px;
}

.analytics-panel.light {
  background: #f8f5ec;
}

.analytics-panel-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
  margin-bottom: 22px;
}

.analytics-panel h3 {
  margin: 0;
  font-size: 23px;
  letter-spacing: -.8px;
}

.analytics-panel-head span {
  color: #748078;
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 1.2px;
}

.platform-row {
  margin-bottom: 18px;
}

.platform-row:last-child {
  margin-bottom: 0;
}

.platform-row-top {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 12px;
  color: #354238;
}

.platform-track {
  height: 9px;
  border-radius: 999px;
  background: #d8ded4;
  overflow: hidden;
}

.platform-fill {
  height: 100%;
  border-radius: inherit;
  background: #5f8b6b;
  min-width: 0;
  transition: width .35s ease;
}

.analytics-recent {
  display: grid;
  gap: 10px;
}

.analytics-recent-item {
  display: flex;
  align-items: center;
  gap: 13px;
  padding: 13px;
  border-radius: 14px;
  background: #eeece2;
}

.analytics-recent-icon {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #d9e4d7;
  color: #4f8164;
  font-size: 16px;
  flex-shrink: 0;
}

.analytics-recent-copy {
  min-width: 0;
  flex: 1;
}

.analytics-recent-copy strong {
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 12px;
}

.analytics-recent-copy span {
  display: block;
  margin-top: 4px;
  color: #778079;
  font-size: 10px;
}

.analytics-empty {
  padding: 35px 15px;
  text-align: center;
  color: #737c76;
  font-size: 13px;
}

.analytics-note {
  margin-top: 18px;
  padding: 15px 17px;
  border-radius: 14px;
  background: #f0eee5;
  color: #667169;
  font-size: 11px;
  line-height: 1.55;
}


/* =========================================================
   SOCIAL PERFORMANCE
========================================================= */
.social-performance {
  margin-top: 18px;
  padding: 25px;
  border-radius: 24px;
  background: #e5eadf;
  border: 1px solid rgba(49,73,57,.1);
}
.social-performance-head {
  display:flex;
  align-items:flex-start;
  justify-content:space-between;
  gap:20px;
  margin-bottom:20px;
}
.social-performance-head h3 { margin:0; font-size:23px; letter-spacing:-.8px; }
.social-performance-head p { margin:6px 0 0; color:#68736b; font-size:12px; }
.performance-status {
  padding:8px 12px; border-radius:999px; background:#f0eee5; color:#667169;
  font-size:10px; text-transform:uppercase; letter-spacing:1px; white-space:nowrap;
}
.performance-metrics {
  display:grid; grid-template-columns:repeat(4,1fr); gap:12px;
}
.performance-metric {
  min-height:118px; padding:18px; border-radius:17px; background:#f8f5ec;
  border:1px solid rgba(34,49,39,.08);
}
.performance-metric-label { color:#748078; font-size:10px; text-transform:uppercase; letter-spacing:1.4px; }
.performance-metric-value { margin-top:15px; font-size:30px; line-height:1; font-weight:800; letter-spacing:-1.5px; }
.performance-metric-note { margin-top:8px; color:#7a837d; font-size:10px; }
.performance-connect {
  margin-top:15px; padding:16px 18px; border-radius:16px; background:#f0eee5;
  display:flex; align-items:center; justify-content:space-between; gap:16px;
}
.performance-connect-copy strong { display:block; font-size:12px; }
.performance-connect-copy span { display:block; margin-top:4px; color:#727c75; font-size:11px; line-height:1.45; }
.performance-connect-btn {
  border:0; border-radius:999px; padding:10px 15px; background:#1b2a20; color:#fff;
  font-size:11px; font-weight:700; white-space:nowrap;
}
.performance-connect-btn:hover { background:#304a38; transform:translateY(-1px); }
.performance-platforms { margin-top:15px; display:grid; grid-template-columns:repeat(4,1fr); gap:10px; }
.performance-platform {
  padding:13px 14px; border-radius:14px; background:#f8f5ec;
  border:1px solid rgba(34,49,39,.08); color:#354238; font-size:11px;
  display:flex; justify-content:space-between; align-items:center;
}
.performance-platform span { color:#7b847e; }

@media (max-width: 900px) {
  .performance-metrics { grid-template-columns:1fr 1fr; }
  .performance-platforms { grid-template-columns:1fr 1fr; }
}
@media (max-width: 650px) {
  .social-performance-head { flex-direction:column; }
  .performance-metrics, .performance-platforms { grid-template-columns:1fr; }
  .performance-connect { flex-direction:column; align-items:flex-start; }
}

@media (max-width: 900px) {
  .analytics-stats { grid-template-columns: 1fr 1fr; }
  .analytics-layout { grid-template-columns: 1fr; }
}

@media (max-width: 650px) {
  .analytics-section { padding-top: 35px; }
  .analytics-hero { flex-direction: column; align-items: flex-start; }
  .analytics-stats { grid-template-columns: 1fr; }
}

`;

/* =========================================================
   NAV BUTTON
========================================================= */

function NavButton({ text, active, onClick }) {
  return (
    <button
      type="button"
      className={`nav-button ${active ? "active" : ""}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

/* =========================================================
   CONTENT MODAL
========================================================= */

function ContentModal({ content, onClose }) {
  if (!content) {
    return null;
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="modal-header">
          <div>
            <h2>Generated Content</h2>

            <p>
              {content.platform || "Instagram"}
            </p>
          </div>

          <button
            type="button"
            className="modal-close"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <div className="modal-body">
          <div className="detail-block">
            <span className="detail-label">
              Caption
            </span>

            <div className="caption-box">
              {content.caption ||
                "No caption available."}
            </div>
          </div>

          {content.hashtags && (
            <div className="detail-block">
              <span className="detail-label">
                Hashtags
              </span>

              <div className="caption-box">
                {content.hashtags}
              </div>
            </div>
          )}

          <div className="detail-grid">
            <div>
              <span className="detail-label">
                Status
              </span>

              <div className="detail-value">
                {content.status || "DRAFT"}
              </div>
            </div>

            <div>
              <span className="detail-label">
                Content Type
              </span>

              <div className="detail-value">
                {content.content_type || "post"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   APP
========================================================= */

function App() {
  async function handleLogin(loginData) {
  try {
    const params = new URLSearchParams();

    params.set("email", loginData.email);
    params.set("password", loginData.password);

    const response = await fetch(
      `${API_BASE_URL}/users/login?${params.toString()}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data?.detail || "Invalid email or password."
      );
    }

    // Save logged-in user
    localStorage.setItem(
      "socialai_user",
      JSON.stringify(data)
    );

    // Update current user ID if your app uses it
    if (data.id) {
      localStorage.setItem(
        "socialai_user_id",
        String(data.id)
      );
    }

    setAuthPage("app");

    console.log("Login successful:", data);
  } catch (error) {
    console.error("Login error:", error);
    alert(error.message || "Login failed.");
  }
}


async function handleRegister(registerData) {
  try {
    const params = new URLSearchParams();

    params.set("name", registerData.name);
    params.set("email", registerData.email);
    params.set("password", registerData.password);

    const response = await fetch(
      `${API_BASE_URL}/users/?${params.toString()}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data?.detail || "Registration failed."
      );
    }

    console.log("Registration successful:", data);

    alert("Account created successfully! Please login.");

    setAuthPage("login");
  } catch (error) {
    console.error("Registration error:", error);
    alert(error.message || "Registration failed.");
  }
}
  const [authPage, setAuthPage] = useState("login");

  const [activePage, setActivePage] =
    useState("Home");

  const [contents, setContents] =
    useState([]);

  const [topic, setTopic] =
    useState("");

  const [platform, setPlatform] =
    useState("Instagram");

  const [brandId, setBrandId] =
    useState(null);

  const [isGenerating, setIsGenerating] =
    useState(false);

  const [isLoading, setIsLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [selectedContent, setSelectedContent] =
    useState(null);

  /* =======================================================
     CALENDAR STATE
  ======================================================= */

  const [currentMonth, setCurrentMonth] =
    useState(new Date());

  const [scheduledContent, setScheduledContent] =
    useState(() => {
      try {
        const saved =
          localStorage.getItem(
            SCHEDULE_STORAGE_KEY
          );

        return saved
          ? JSON.parse(saved)
          : {};
      } catch {
        return {};
      }
    });

  const [selectedScheduleDate, setSelectedScheduleDate] =
    useState(null);

  const [selectedScheduleTime, setSelectedScheduleTime] =
    useState("19:00");

  const [isScheduling, setIsScheduling] =
    useState(false);

  /* =======================================================
     SAVE CALENDAR DATA
  ======================================================= */

  useEffect(() => {
    try {
      localStorage.setItem(
        SCHEDULE_STORAGE_KEY,
        JSON.stringify(
          scheduledContent
        )
      );
    } catch (error) {
      console.error(
        "Could not save calendar:",
        error
      );
    }
  }, [scheduledContent]);

  /* =======================================================
     ERROR MESSAGE
  ======================================================= */

  async function getErrorMessage(response) {
    try {
      const data =
        await response.json();

      if (
        typeof data?.detail ===
        "string"
      ) {
        return data.detail;
      }

      if (
        Array.isArray(
          data?.detail
        )
      ) {
        return data.detail
          .map(
            (item) =>
              item?.msg ||
              JSON.stringify(item)
          )
          .join(", ");
      }

      if (
        typeof data?.message ===
        "string"
      ) {
        return data.message;
      }

      return `Request failed with status ${response.status}`;
    } catch {
      return `Request failed with status ${response.status}`;
    }
  }

  /* =======================================================
     FIND BRAND
  ======================================================= */

  async function findBrand() {
    try {
      const response =
        await fetch(
          `${API_BASE_URL}/brands/`,
          {
            method: "GET",
            headers: {
              Accept:
                "application/json",
            },
          }
        );

      if (!response.ok) {
        return null;
      }

      const data =
        await response.json();

      if (
        Array.isArray(data) &&
        data.length > 0
      ) {
        const firstBrand =
          data[0];

        if (firstBrand?.id) {
          setBrandId(
            firstBrand.id
          );

          return firstBrand.id;
        }
      }

      if (
        Array.isArray(
          data?.brands
        ) &&
        data.brands.length > 0
      ) {
        const firstBrand =
          data.brands[0];

        if (firstBrand?.id) {
          setBrandId(
            firstBrand.id
          );

          return firstBrand.id;
        }
      }

      return null;
    } catch (error) {
      console.log(
        "Brand lookup skipped:",
        error
      );

      return null;
    }
  }

  /* =======================================================
     LOAD CONTENT
  ======================================================= */

  async function loadContents() {
    setIsLoading(true);

    try {
      const response = await fetch(
  `${API_BASE_URL}/contents/?user_id=${USER_ID}`,
  {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  }
);

      if (!response.ok) {
        throw new Error(
          await getErrorMessage(
            response
          )
        );
      }

      const data =
        await response.json();

      setContents(
        Array.isArray(data)
          ? data
          : []
      );
    } catch (error) {
      console.error(
        "Load content error:",
        error
      );

      if (
        error?.message ===
          "Failed to fetch" ||
        error?.message?.includes(
          "NetworkError"
        )
      ) {
        setMessage(
          "Backend connection nahi ho raha. FastAPI ko http://127.0.0.1:8000 par chalao."
        );
      } else {
        setMessage(
          `Could not load content: ${
            error?.message ||
            "Backend unavailable"
          }`
        );
      }
    } finally {
      setIsLoading(false);
    }
  }

  /* =======================================================
     STARTUP
  ======================================================= */

  useEffect(() => {
    loadContents();
    // Do not block the generator on /brands/. The working backend
    // already accepts brand_id=1 (verified through Swagger).
    setBrandId(DEFAULT_BRAND_ID);
  }, []);

  /* =======================================================
     GENERATE
  ======================================================= */

  async function generateContent() {
    const cleanTopic =
      topic.trim();

    if (!cleanTopic) {
      setMessage(
        "Please enter a topic first."
      );

      return;
    }

    setIsGenerating(true);
    setMessage("");

    try {
      // IMPORTANT: never wait for /brands/ here. That endpoint was
      // making the UI look stuck even though /contents/generate works.
      const selectedBrandId =
        brandId || DEFAULT_BRAND_ID;

      const params =
        new URLSearchParams();

      params.set(
        "brand_id",
        String(
          selectedBrandId
        )
      );

      params.set(
        "user_id",
        String(USER_ID)
      );

      params.set(
        "topic",
        cleanTopic
      );

      params.set(
        "platform",
        platform
      );

      params.set(
  "brand_id",
  String(selectedBrandId)
);

params.set(
  "user_id",
  String(USER_ID)
);

params.set(
  "topic",
  cleanTopic
);

params.set(
  "platform",
  platform
);

      const url =
        `${API_BASE_URL}/contents/generate?${params.toString()}`;

      console.log(
        "Generating content..."
      );

      console.log(
        "Request URL:",
        url
      );

      const controller = new AbortController();
      const timeoutId = setTimeout(
        () => controller.abort(),
        REQUEST_TIMEOUT_MS
      );

      let response;
      try {
        response = await fetch(url, {
          method: "POST",
          headers: {
            Accept: "application/json",
          },
          signal: controller.signal,
          mode: "cors",
        });
      } finally {
        clearTimeout(timeoutId);
      }

      if (!response.ok) {
        throw new Error(
          await getErrorMessage(
            response
          )
        );
      }

      const data =
        await response.json();

      console.log(
        "Generated content:",
        data
      );

      if (data?.id) {
        const generated = {
          ...data,

          platform:
            data.platform ||
            platform,
        };

        setContents(
          (previous) => {
            const exists =
              previous.some(
                (item) =>
                  item.id ===
                  data.id
              );

            if (exists) {
              return previous;
            }

            return [
              generated,
              ...previous,
            ];
          }
        );

        setSelectedContent(
          generated
        );
      }

      // The POST response already contains the newly created content.
      // Do not wait for /contents/ again; if that GET is slow, it makes
      // a successful generation look like it is stuck on "Creating...".
      setTopic("");

      setMessage(
        "Content generated successfully ✦"
      );
    } catch (error) {
      console.error(
        "Generation error:",
        error
      );

      let errorText =
        error?.message ||
        "Unknown error";

      if (error?.name === "AbortError") {
        errorText =
          "Backend response mein 45 seconds se zyada lag raha hai. FastAPI/Gemini request check karo.";
      } else if (
        errorText === "Failed to fetch" ||
        errorText.includes("NetworkError")
      ) {
        errorText =
          "Frontend backend se connect nahi kar pa raha. FastAPI 8000 par running aur CORS mein http://localhost:5175 allowed hona chahiye.";
      }

      setMessage(
        `Generation failed: ${errorText}`
      );
    } finally {
      setIsGenerating(false);
    }
  }

  /* =======================================================
     DELETE
  ======================================================= */

  async function deleteContent(id) {
    try {
      const response =
        await fetch(
          `${API_BASE_URL}/contents/${id}`,
          {
            method: "DELETE",

            headers: {
              Accept:
                "application/json",
            },
          }
        );

      if (!response.ok) {
        throw new Error(
          await getErrorMessage(
            response
          )
        );
      }

      setContents(
        (previous) =>
          previous.filter(
            (item) =>
              item.id !== id
          )
      );

      setScheduledContent(
        (previous) => {
          const next = {
            ...previous,
          };

          Object.keys(next).forEach(
            (date) => {
              next[date] =
                next[date].filter(
                  (item) =>
                    item.id !== id
                );

              if (
                next[date].length ===
                0
              ) {
                delete next[date];
              }
            }
          );

          return next;
        }
      );

      if (
        selectedContent?.id ===
        id
      ) {
        setSelectedContent(
          null
        );
      }

      setMessage(
        "Content deleted successfully."
      );
    } catch (error) {
      console.error(
        "Delete error:",
        error
      );

      setMessage(
        `Delete failed: ${
          error?.message ||
          "Unable to delete content."
        }`
      );
    }
  }

  /* =======================================================
     HELPERS
  ======================================================= */

  function getTitle(item) {
    if (item?.title) {
      return item.title;
    }

    if (item?.caption) {
      const firstLine =
        item.caption
          .split("\n")
          .map((line) =>
            line.trim()
          )
          .find(
            (line) =>
              line.length > 0
          );

      if (firstLine) {
        return firstLine.substring(
          0,
          60
        );
      }
    }

    return `Content #${
      item?.id || ""
    }`;
  }

  function getPlatform(item) {
    return (
      item?.platform ||
      platform ||
      "Instagram"
    );
  }

  function getStatus(item) {
    return String(
      item?.status ||
        "DRAFT"
    ).toUpperCase();
  }

  function getDate(item) {
    if (item?.created_at) {
      const date =
        new Date(
          item.created_at
        );

      if (
        !Number.isNaN(
          date.getTime()
        )
      ) {
        return date.toLocaleDateString();
      }
    }

    return "Recently";
  }

  /* =======================================================
     DATE HELPERS
  ======================================================= */

  function formatDateKey(
    date
  ) {
    const year =
      date.getFullYear();

    const month =
      String(
        date.getMonth() + 1
      ).padStart(2, "0");

    const day =
      String(
        date.getDate()
      ).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  function isSameDate(
    first,
    second
  ) {
    return (
      first.getFullYear() ===
        second.getFullYear() &&
      first.getMonth() ===
        second.getMonth() &&
      first.getDate() ===
        second.getDate()
    );
  }

  function getCalendarDays() {
    const year =
      currentMonth.getFullYear();

    const month =
      currentMonth.getMonth();

    const firstDay =
      new Date(
        year,
        month,
        1
      );

    const startingDay =
      firstDay.getDay();

    const daysInMonth =
      new Date(
        year,
        month + 1,
        0
      ).getDate();

    const previousMonthDays =
      new Date(
        year,
        month,
        0
      ).getDate();

    const days = [];

    for (
      let i = startingDay - 1;
      i >= 0;
      i--
    ) {
      days.push(
        new Date(
          year,
          month - 1,
          previousMonthDays -
            i
        )
      );
    }

    for (
      let day = 1;
      day <= daysInMonth;
      day++
    ) {
      days.push(
        new Date(
          year,
          month,
          day
        )
      );
    }

    let nextDay = 1;

    while (
      days.length < 42
    ) {
      days.push(
        new Date(
          year,
          month + 1,
          nextDay++
        )
      );
    }

    return days;
  }

  function getMonthName() {
    return currentMonth.toLocaleDateString(
      "en-US",
      {
        month: "long",
        year: "numeric",
      }
    );
  }

  /* =======================================================
     CALENDAR CONTENT
  ======================================================= */

  const calendarDays =
    useMemo(
      () =>
        getCalendarDays(),
      [currentMonth]
    );

  function getEventsForDate(
    date
  ) {
    const key =
      formatDateKey(date);

    const localEvents =
      scheduledContent[key] ||
      [];

    const backendEvents =
      contents.filter(
        (item) => {
          if (!item?.scheduled_at) {
            return false;
          }

          const itemDate =
            new Date(
              item.scheduled_at
            );

          if (
            Number.isNaN(
              itemDate.getTime()
            )
          ) {
            return false;
          }

          return (
            formatDateKey(
              itemDate
            ) === key
          );
        }
      );

    const combined = [
      ...localEvents,
      ...backendEvents,
    ];

    return combined.filter(
      (item, index, array) =>
        array.findIndex(
          (other) =>
            other?.id === item?.id
        ) === index
    );
  }

  /* =======================================================
     SCHEDULE CONTENT
  ======================================================= */

  function scheduleContentForDate(
    date
  ) {
    if (contents.length === 0) {
      setMessage(
        "Pehle AI Generator se content create karo."
      );
      return;
    }

    setSelectedScheduleDate(
      formatDateKey(date)
    );
    setSelectedScheduleTime("19:00");
  }

  async function addContentToDate(
    contentId
  ) {
    if (
      !selectedScheduleDate ||
      !selectedScheduleTime
    ) {
      return;
    }

    const content = contents.find(
      (item) => item.id === Number(contentId)
    );

    if (!content) {
      return;
    }

    setIsScheduling(true);
    setMessage("");

    try {
      const localDateTime =
        `${selectedScheduleDate}T${selectedScheduleTime}:00`;

      const params = new URLSearchParams();
      params.set("scheduled_at", localDateTime);

      const response = await fetch(
        `${API_BASE_URL}/contents/${content.id}/schedule?${params.toString()}`,
        {
          method: "PATCH",
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          await getErrorMessage(response)
        );
      }

      const updated = await response.json();

      setContents((previous) =>
        previous.map((item) =>
          item.id === content.id
            ? {
                ...item,
                ...updated,
                platform: item.platform || platform,
              }
            : item
        )
      );

      setScheduledContent((previous) => {
        const existing =
          previous[selectedScheduleDate] || [];

        const withoutDuplicate = existing.filter(
          (item) => item.id !== content.id
        );

        return {
          ...previous,
          [selectedScheduleDate]: [
            ...withoutDuplicate,
            {
              ...content,
              ...updated,
              platform: content.platform || platform,
            },
          ],
        };
      });

      setSelectedScheduleDate(null);
      setSelectedScheduleTime("19:00");
      setMessage("Content successfully scheduled ✦");
    } catch (error) {
      console.error("Schedule error:", error);
      setMessage(
        `Scheduling failed: ${error?.message || "Unable to schedule content."}`
      );
    } finally {
      setIsScheduling(false);
    }
  }

  async function removeScheduledContent(
    dateKey,
    contentId
  ) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/contents/${contentId}/unschedule`,
        {
          method: "PATCH",
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          await getErrorMessage(response)
        );
      }

      setScheduledContent((previous) => {
        const next = { ...previous };
        if (next[dateKey]) {
          next[dateKey] = next[dateKey].filter(
            (item) => item.id !== contentId
          );
          if (next[dateKey].length === 0) {
            delete next[dateKey];
          }
        }
        return next;
      });

      setContents((previous) =>
        previous.map((item) =>
          item.id === contentId
            ? { ...item, scheduled_at: null, status: "DRAFT" }
            : item
        )
      );

      setMessage("Scheduled content removed.");
    } catch (error) {
      console.error("Unschedule error:", error);
      setMessage(
        `Could not remove schedule: ${error?.message || "Unable to unschedule content."}`
      );
    }
  }

  /* =======================================================
     CALENDAR PAGE
  ======================================================= */

  function calendarPage() {
    const today =
      new Date();

    return (
      <section className="calendar-section">
        <div className="content-header">
          <div>
            <div className="section-label">
              04 · CONTENT PLANNER
            </div>

            <h2>
              Your calendar
            </h2>

            <p>
              Plan your social media
              content and stay consistent.
            </p>
          </div>
        </div>

        <div className="calendar-shell">
          <div className="calendar-toolbar">
            <div className="calendar-title">
              <div>
                <h2>
                  {getMonthName()}
                </h2>

                <p>
                  {contents.length} content
                  item
                  {contents.length ===
                  1
                    ? ""
                    : "s"} available
                </p>
              </div>
            </div>

            <div className="calendar-controls">
              <button
                type="button"
                className="today-button"
                onClick={() =>
                  setCurrentMonth(
                    new Date()
                  )
                }
              >
                Today
              </button>

              <button
                type="button"
                className="calendar-control"
                onClick={() =>
                  setCurrentMonth(
                    (previous) =>
                      new Date(
                        previous.getFullYear(),
                        previous.getMonth() -
                          1,
                        1
                      )
                  )
                }
              >
                ←
              </button>

              <button
                type="button"
                className="calendar-control"
                onClick={() =>
                  setCurrentMonth(
                    (previous) =>
                      new Date(
                        previous.getFullYear(),
                        previous.getMonth() +
                          1,
                        1
                      )
                  )
                }
              >
                →
              </button>
            </div>
          </div>

          <div className="calendar-weekdays">
            {[
              "Sun",
              "Mon",
              "Tue",
              "Wed",
              "Thu",
              "Fri",
              "Sat",
            ].map(
              (day) => (
                <div
                  key={day}
                  className="calendar-weekday"
                >
                  {day}
                </div>
              )
            )}
          </div>

          <div className="calendar-grid">
            {calendarDays.map(
              (date, index) => {
                const key =
                  formatDateKey(
                    date
                  );

                const events =
                  getEventsForDate(
                    date
                  );

                const isToday =
                  isSameDate(
                    date,
                    today
                  );

                const isCurrentMonth =
                  date.getMonth() ===
                  currentMonth.getMonth();

                return (
                  <div
                    key={`${key}-${index}`}
                    className={`calendar-day ${
                      isCurrentMonth
                        ? ""
                        : "muted"
                    } ${
                      isToday
                        ? "today"
                        : ""
                    }`}
                  >
                    <div className="calendar-day-number">
                      {date.getDate()}
                    </div>

                    <div className="calendar-events">
                      {events
                        .slice(0, 3)
                        .map(
                          (item) => {
                            const platformName =
                              getPlatform(
                                item
                              );

                            const platformClass =
                              platformName
                                .toLowerCase()
                                .replace(
                                  /\s+/g,
                                  "-"
                                );

                            return (
                              <button
                                type="button"
                                key={
                                  item.id
                                }
                                className={`calendar-event ${platformClass}`}
                                onClick={() =>
                                  setSelectedContent(
                                    {
                                      ...item,
                                      platform:
                                        platformName,
                                    }
                                  )
                                }
                              >
                                <strong>
                                  {platformName}
                                </strong>

                                <span>
                                  {getTitle(
                                    item
                                  )}
                                </span>
                              </button>
                            );
                          }
                        )}

                      {events.length >
                        3 && (
                        <div
                          style={{
                            fontSize:
                              "9px",
                            color:
                              "#718078",
                            padding:
                              "3px 5px",
                          }}
                        >
                          +
                          {events.length -
                            3}{" "}
                          more
                        </div>
                      )}
                    </div>

                    {isCurrentMonth && (
                      <button
                        type="button"
                        className="calendar-add"
                        onClick={() =>
                          scheduleContentForDate(
                            date
                          )
                        }
                      >
                        + Schedule
                      </button>
                    )}
                  </div>
                );
              }
            )}
          </div>

          <div className="calendar-legend">
            <div className="legend-item">
              <span className="legend-dot"></span>
              Click + Schedule to add content
            </div>

            <div className="legend-item">
              ✦ AI generated
            </div>

            <div className="legend-item">
              Click a post to open it
            </div>
          </div>
        </div>

        {selectedScheduleDate && (
          <div className="schedule-panel">
            <h3>
              Schedule content
            </h3>

            <p>
              Choose which generated post
              you want to schedule for{" "}
              <strong>
                {new Date(
                  `${selectedScheduleDate}T00:00:00`
                ).toLocaleDateString(
                  "en-US",
                  {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  }
                )}
              </strong>
              .
            </p>

            <div className="schedule-time-row">
              <label htmlFor="schedule-time" className="field-label">
                Time
              </label>
              <input
                id="schedule-time"
                type="time"
                className="schedule-time-input"
                value={selectedScheduleTime}
                onChange={(e) => setSelectedScheduleTime(e.target.value)}
                disabled={isScheduling}
              />
            </div>

            {contents.length ===
            0 ? (
              <p>
                No generated content
                available.
              </p>
            ) : (
              <div className="schedule-list">
                {contents
                  .slice(0, 10)
                  .map(
                    (item) => {
                      const alreadyScheduled =
                        (
                          scheduledContent[
                            selectedScheduleDate
                          ] ||
                          []
                        ).some(
                          (scheduled) =>
                            scheduled.id ===
                            item.id
                        );

                      return (
                        <div
                          className="schedule-item"
                          key={item.id}
                        >
                          <div className="schedule-item-main">
                            <div className="schedule-item-title">
                              {getTitle(
                                item
                              )}
                            </div>

                            <div className="schedule-item-meta">
                              {getPlatform(
                                item
                              )}{" "}
                              ·{" "}
                              {getStatus(
                                item
                              )}
                            </div>
                          </div>

                          <button
                            type="button"
                            className="small-button"
                            disabled={
                              alreadyScheduled ||
                              isScheduling
                            }
                            onClick={() =>
                              addContentToDate(
                                item.id
                              )
                            }
                          >
                            {alreadyScheduled
                              ? "Scheduled ✓"
                              : isScheduling
                              ? "Saving..."
                              : "Schedule"}
                          </button>
                        </div>
                      );
                    }
                  )}
              </div>
            )}

            <button
              type="button"
              className="secondary-btn"
              style={{
                marginTop: "15px",
              }}
              onClick={() =>
                setSelectedScheduleDate(
                  null
                )
              }
            >
              Cancel
            </button>
          </div>
        )}

        {Object.keys(
          scheduledContent
        ).length > 0 && (
          <div
            className="schedule-panel"
            style={{
              marginTop: "20px",
            }}
          >
            <h3>
              Upcoming scheduled posts
            </h3>

            <p>
              Your planned social media
              content.
            </p>

            <div className="schedule-list">
              {Object.entries(
                scheduledContent
              )
                .sort(
                  ([dateA], [dateB]) =>
                    dateA.localeCompare(
                      dateB
                    )
                )
                .flatMap(
                  ([
                    dateKey,
                    items,
                  ]) =>
                    items.map(
                      (item) => ({
                        dateKey,
                        item,
                      })
                    )
                )
                .map(
                  ({
                    dateKey,
                    item,
                  }) => (
                    <div
                      className="schedule-item"
                      key={`${dateKey}-${item.id}`}
                    >
                      <div className="schedule-item-main">
                        <div className="schedule-item-title">
                          {getTitle(
                            item
                          )}
                        </div>

                        <div className="schedule-item-meta">
                          {new Date(
                            `${dateKey}T00:00:00`
                          ).toLocaleDateString(
                            "en-US",
                            {
                              weekday:
                                "short",
                              day: "numeric",
                              month:
                                "short",
                              year:
                                "numeric",
                            }
                          )}{" "}
                          ·{" "}
                          {getPlatform(
                            item
                          )}
                        </div>
                      </div>

                      <div
                        style={{
                          display:
                            "flex",
                          gap: "5px",
                        }}
                      >
                        <button
                          type="button"
                          className="small-button"
                          onClick={() =>
                            setSelectedContent(
                              {
                                ...item,
                                platform:
                                  getPlatform(
                                    item
                                  ),
                              }
                            )
                          }
                        >
                          Open
                        </button>

                        <button
                          type="button"
                          className="schedule-remove"
                          onClick={() =>
                            removeScheduledContent(
                              dateKey,
                              item.id
                            )
                          }
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  )
                )}
            </div>
          </div>
        )}
      </section>
    );
  }

  /* =======================================================
     HOME PAGE
  ======================================================= */

  const homePage = (
    <>
      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow">
            <span className="eyebrow-line"></span>
            AI SOCIAL MEDIA AGENT
          </div>

          <h1 className="hero-title">
            Create.
            <br />
            Publish.
            <br />
            <em>
              <span className="green-text">
                Grow.
              </span>
            </em>
          </h1>

          <p className="hero-description">
            Create powerful social media
            content with AI. Plan your ideas,
            generate captions and manage your
            content — all from one beautiful
            workspace.
          </p>

          <div className="hero-actions">
            <button
              type="button"
              className="primary-btn"
              onClick={() => {
                document
                  .getElementById(
                    "generator"
                  )
                  ?.scrollIntoView({
                    behavior:
                      "smooth",
                  });
              }}
            >
              Start creating →
            </button>

            <button
              type="button"
              className="secondary-btn"
              onClick={() =>
                setActivePage(
                  "Content"
                )
              }
            >
              View content
            </button>
          </div>

          <div className="hero-note">
            ✦ AI powered · Instagram ·
            Facebook · LinkedIn · Twitter
          </div>
        </div>

        <div className="hero-visual">
          <div className="green-orb"></div>

          <div className="dark-orb"></div>

          <div className="preview-card">
            <div className="preview-top">
              <span>
                SOCIALAI
              </span>

              <span>
                AI AGENT
              </span>
            </div>

            <div className="preview-content">
              <div className="preview-small">
                YOUR NEXT POST
              </div>

              <h2 className="preview-heading">
                Turn ideas
                <br />
                into impact.
              </h2>

              <div className="preview-search">
                <span>
                  What should we
                  post today?
                </span>

                <span className="preview-arrow">
                  ↗
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="generator"
        className="generator-section"
      >
        <div className="section-label">
          01 · AI GENERATOR
        </div>

        <h2 className="section-title">
          Your idea.
          <br />
          <em>
            Our intelligence.
          </em>
        </h2>

        <p className="section-description">
          Tell SocialAI what you want to
          talk about and choose your
          platform. Gemini will generate
          ready-to-use social media content
          for you.
        </p>

        <div className="generator-form">
          <div>
            <label
              htmlFor="topic"
              className="field-label"
            >
              What do you want to post
              about?
            </label>

            <input
              id="topic"
              className="topic-input"
              value={topic}
              onChange={(e) =>
                setTopic(
                  e.target.value
                )
              }
              placeholder="e.g. Diwali sale for clothing brand"
              disabled={
                isGenerating
              }
              onKeyDown={(e) => {
                if (
                  e.key === "Enter"
                ) {
                  generateContent();
                }
              }}
            />
          </div>

          <div>
            <label
              htmlFor="platform"
              className="field-label"
            >
              Platform
            </label>

            <select
              id="platform"
              className="platform-select"
              value={platform}
              onChange={(e) =>
                setPlatform(
                  e.target.value
                )
              }
              disabled={
                isGenerating
              }
            >
              <option value="Instagram">
                Instagram
              </option>

              <option value="Facebook">
                Facebook
              </option>

              <option value="LinkedIn">
                LinkedIn
              </option>

              <option value="Twitter">
                Twitter
              </option>
            </select>
          </div>

          <button
            type="button"
            className="generate-btn"
            onClick={
              generateContent
            }
            disabled={
              isGenerating ||
              !topic.trim()
            }
          >
            {isGenerating
              ? "Creating..."
              : "✦ Generate"}
          </button>
        </div>

        {message && (
          <div
            className={`message ${
              message
                .toLowerCase()
                .includes(
                  "failed"
                ) ||
              message
                .toLowerCase()
                .includes(
                  "error"
                ) ||
              message
                .toLowerCase()
                .includes(
                  "could not"
                )
                ? "error"
                : "success"
            }`}
          >
            {message}
          </div>
        )}
      </section>

      <section className="content-section">
        <div className="content-header">
          <div>
            <div className="section-label">
              02 · YOUR WORK
            </div>

            <h2>
              Recent content
            </h2>

            <p>
              Everything you create,
              in one place.
            </p>
          </div>

          <button
            type="button"
            className="refresh-button"
            onClick={
              loadContents
            }
            disabled={
              isLoading
            }
          >
            {isLoading
              ? "Loading..."
              : "↻ Refresh"}
          </button>
        </div>

        {contents.length ===
        0 ? (
          <div className="empty-state">
            <div className="empty-mark">
              ✦
            </div>

            <h3>
              No content yet
            </h3>

            <p>
              Enter a topic above
              and create your
              first AI-generated
              post.
            </p>
          </div>
        ) : (
          <div className="content-grid">
            {contents
              .slice(0, 9)
              .map((item) => (
                <div
                  className="content-card"
                  key={item.id}
                >
                  <div className="content-card-top">
                    <span className="platform-badge">
                      {getPlatform(
                        item
                      )}
                    </span>

                    <span className="status-badge">
                      {getStatus(
                        item
                      )}
                    </span>
                  </div>

                  <h3>
                    {getTitle(
                      item
                    )}
                  </h3>

                  <div className="content-preview">
                    {item.caption ||
                      "AI generated content"}
                  </div>

                  <div className="card-footer">
                    <span className="date">
                      {getDate(
                        item
                      )}
                    </span>

                    <div className="card-actions">
                      <button
                        type="button"
                        className="small-button"
                        onClick={() =>
                          setSelectedContent(
                            {
                              ...item,
                              platform:
                                getPlatform(
                                  item
                                ),
                            }
                          )
                        }
                      >
                        Open
                      </button>

                      <button
                        type="button"
                        className="small-button delete"
                        onClick={() =>
                          deleteContent(
                            item.id
                          )
                        }
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </section>

      <section className="services">
        <div className="services-left">
          <div className="section-label">
            03 · WORKSPACE
          </div>

          <h2>
            Built for
            <br />
            <em>
              modern creators.
            </em>
          </h2>

          <p>
            One clean workspace to create
            content, manage your ideas and
            keep your social media workflow
            organized.
          </p>
        </div>

        <div className="feature-list">
          <div className="feature-row">
            <span className="feature-number">
              01 · AI
            </span>

            <span className="feature-name green">
              AI Content
            </span>

            <span className="feature-meta">
              Gemini · Generation
            </span>
          </div>

          <div className="feature-row">
            <span className="feature-number">
              02 · SOCIAL
            </span>

            <span className="feature-name">
              Social Posts
            </span>

            <span className="feature-meta">
              Instagram · Facebook
            </span>
          </div>

          <div className="feature-row">
            <span className="feature-number">
              03 · PLAN
            </span>

            <span className="feature-name">
              Content Planning
            </span>

            <span className="feature-meta">
              Draft · Schedule
            </span>
          </div>

          <div className="feature-row">
            <span className="feature-number">
              04 · INSIGHT
            </span>

            <span className="feature-name">
              Analytics
            </span>

            <span className="feature-meta">
              Performance · Growth
            </span>
          </div>
        </div>
      </section>
    </>
  );

  /* =======================================================
     CONTENT PAGE
  ======================================================= */

  const contentPage = (
    <section className="content-section">
      <div className="content-header">
        <div>
          <div className="section-label">
            02 · CONTENT LIBRARY
          </div>

          <h2>
            All content
          </h2>

          <p>
            Manage your generated
            social media posts.
          </p>
        </div>

        <button
          type="button"
          className="refresh-button"
          onClick={
            loadContents
          }
        >
          ↻ Refresh
        </button>
      </div>

      {contents.length ===
      0 ? (
        <div className="empty-state">
          <div className="empty-mark">
            ✦
          </div>

          <h3>
            No content yet
          </h3>

          <p>
            Generate your first
            post from the
            dashboard.
          </p>
        </div>
      ) : (
        <div className="content-grid">
          {contents.map(
            (item) => (
              <div
                className="content-card"
                key={item.id}
              >
                <div className="content-card-top">
                  <span className="platform-badge">
                    {getPlatform(
                      item
                    )}
                  </span>

                  <span className="status-badge">
                    {getStatus(
                      item
                    )}
                  </span>
                </div>

                <h3>
                  {getTitle(
                    item
                  )}
                </h3>

                <div className="content-preview">
                  {item.caption}
                </div>

                <div className="card-footer">
                  <span className="date">
                    {getDate(
                      item
                    )}
                  </span>

                  <div className="card-actions">
                    <button
                      type="button"
                      className="small-button"
                      onClick={() =>
                        setSelectedContent(
                          {
                            ...item,
                            platform:
                              getPlatform(
                                item
                              ),
                          }
                        )
                      }
                    >
                      Open
                    </button>

                    <button
                      type="button"
                      className="small-button delete"
                      onClick={() =>
                        deleteContent(
                          item.id
                        )
                      }
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      )}
    </section>
  );

  /* =======================================================
     SIMPLE PAGES
  ======================================================= */

  function simplePage(
    title,
    subtitle
  ) {
    return (
      <section className="content-section">
        <div className="section-label">
          SOCIALAI · WORKSPACE
        </div>

        <h2 className="section-title">
          {title}
        </h2>

        <p className="section-description">
          {subtitle}
        </p>

        <div className="empty-state">
          <div className="empty-mark">
            ✦
          </div>

          <h3>
            {title}
          </h3>

          <p>
            This section is
            ready for the next
            stage of your
            SocialAI project.
          </p>
        </div>
      </section>
    );
  }

  /* =======================================================
     ANALYTICS PAGE
  ======================================================= */

  function analyticsPage() {
    const total = contents.length;
    const scheduled = contents.filter((item) => getStatus(item) === "SCHEDULED").length;
    const published = contents.filter((item) => ["PUBLISHED", "POSTED", "LIVE"].includes(getStatus(item))).length;
    const drafts = contents.filter((item) => !["SCHEDULED", "PUBLISHED", "POSTED", "LIVE"].includes(getStatus(item))).length;

    const platforms = ["Instagram", "Facebook", "LinkedIn", "Twitter"];
    const platformCounts = platforms.map((name) => ({
      name,
      count: contents.filter((item) => getPlatform(item).toLowerCase() === name.toLowerCase()).length,
    }));
    const maxPlatform = Math.max(1, ...platformCounts.map((item) => item.count));

    const recent = [...contents]
      .sort((a, b) => new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime())
      .slice(0, 5);

    return (
      <section className="analytics-section">
        <div className="analytics-hero">
          <div>
            <div className="section-label">05 · PERFORMANCE</div>
            <h1 className="analytics-title">Your content.<br /><em>At a glance.</em></h1>
            <p className="analytics-subtitle">
              Track your content workflow now, then connect your social accounts to unlock real-world reach, engagement and audience insights.
            </p>
          </div>
          <button type="button" className="refresh-button analytics-refresh" onClick={loadContents} disabled={isLoading}>
            {isLoading ? "Loading..." : "↻ Refresh data"}
          </button>
        </div>

        <div className="analytics-stats">
          <div className="analytics-stat"><div className="analytics-stat-label">Total content</div><div className="analytics-stat-number">{total}</div><div className="analytics-stat-note">All generated posts</div></div>
          <div className="analytics-stat"><div className="analytics-stat-label">Scheduled</div><div className="analytics-stat-number">{scheduled}</div><div className="analytics-stat-note">Ready for publishing</div></div>
          <div className="analytics-stat"><div className="analytics-stat-label">Published</div><div className="analytics-stat-number">{published}</div><div className="analytics-stat-note">Live / posted content</div></div>
          <div className="analytics-stat"><div className="analytics-stat-label">Drafts</div><div className="analytics-stat-number">{drafts}</div><div className="analytics-stat-note">Content still in workspace</div></div>
        </div>

        <div className="analytics-layout">
          <div className="analytics-panel">
            <div className="analytics-panel-head"><h3>Platform mix</h3><span>{total} total</span></div>
            {platformCounts.map((item) => (
              <div className="platform-row" key={item.name}>
                <div className="platform-row-top"><span>{item.name}</span><strong>{item.count}</strong></div>
                <div className="platform-track"><div className="platform-fill" style={{ width: `${(item.count / maxPlatform) * 100}%` }} /></div>
              </div>
            ))}
            <div className="analytics-note">This shows where your generated content is being prepared. Publishing and performance data will appear after account connections are added.</div>
          </div>

          <div className="analytics-panel light">
            <div className="analytics-panel-head"><h3>Recent activity</h3><span>Latest 5</span></div>
            {recent.length === 0 ? (
              <div className="analytics-empty">No content yet. Generate your first post to populate analytics.</div>
            ) : (
              <div className="analytics-recent">
                {recent.map((item) => (
                  <div className="analytics-recent-item" key={item.id}>
                    <div className="analytics-recent-icon">✦</div>
                    <div className="analytics-recent-copy">
                      <strong>{getTitle(item)}</strong>
                      <span>{getPlatform(item)} · {getStatus(item)} · {getDate(item)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="social-performance">
          <div className="social-performance-head">
            <div>
              <h3>Social performance</h3>
              <p>Real metrics will appear here once your social accounts are connected.</p>
            </div>
            <div className="performance-status">Accounts not connected</div>
          </div>

          <div className="performance-metrics">
            {[
              ["Reach", "—", "Waiting for account data"],
              ["Impressions", "—", "Waiting for account data"],
              ["Engagement", "—", "Likes + comments + shares"],
              ["Engagement rate", "—", "Calculated from live metrics"],
            ].map(([label, value, note]) => (
              <div className="performance-metric" key={label}>
                <div className="performance-metric-label">{label}</div>
                <div className="performance-metric-value">{value}</div>
                <div className="performance-metric-note">{note}</div>
              </div>
            ))}
          </div>

          <div className="performance-platforms">
            {platforms.map((name) => (
              <div className="performance-platform" key={name}><strong>{name}</strong><span>Not connected</span></div>
            ))}
          </div>

          <div className="performance-connect">
            <div className="performance-connect-copy">
              <strong>Ready for the next stage?</strong>
              <span>Connect Instagram, Facebook, LinkedIn or Twitter so SocialAI can pull actual performance data instead of showing made-up numbers.</span>
            </div>
            <button type="button" className="performance-connect-btn" onClick={() => setActivePage("Settings")}>Connect accounts ↗</button>
          </div>
        </div>
      </section>
    );
  }

  /* =======================================================
     FINAL UI
  ======================================================= */

    if (authPage === "login") {
    return (
      <Login
  onLogin={handleLogin}
  onRegister={() => setAuthPage("register")}
/>
    );
  }

  if (authPage === "register") {
    return (
      <Register
  onRegister={handleRegister}
  onLogin={() => setAuthPage("login")}
/>
    );
  }
  return (
    <>
      <style>
        {styles}
      </style>

      <div className="app">
        <header className="top-nav">
          <div className="logo-area">
            <div className="logo-mark">
              ✦
            </div>

            <div>
              <div className="logo-name">
                SocialAI
              </div>

              <div className="logo-subtitle">
                Content Agent
              </div>
            </div>
          </div>

          <nav className="nav-pill">
            <NavButton
              text="Home"
              active={
                activePage ===
                "Home"
              }
              onClick={() =>
                setActivePage(
                  "Home"
                )
              }
            />

            <NavButton
              text="AI Generator"
              active={
                activePage ===
                "AI Generator"
              }
              onClick={() =>
                setActivePage(
                  "AI Generator"
                )
              }
            />

            <NavButton
              text="Content"
              active={
                activePage ===
                "Content"
              }
              onClick={() =>
                setActivePage(
                  "Content"
                )
              }
            />

            <NavButton
              text="Calendar"
              active={
                activePage ===
                "Calendar"
              }
              onClick={() =>
                setActivePage(
                  "Calendar"
                )
              }
            />

            <NavButton
              text="Analytics"
              active={
                activePage ===
                "Analytics"
              }
              onClick={() =>
                setActivePage(
                  "Analytics"
                )
              }
            />
          </nav>

          <div className="nav-actions">
            <button
              type="button"
              className="circle-btn"
              title="Refresh"
              onClick={
                loadContents
              }
            >
              ↻
            </button>

            <button
              type="button"
              className="contact-btn"
              onClick={() =>
                setActivePage(
                  "Settings"
                )
              }
            >
              Settings ↗
            </button>
          </div>
        </header>

        <main className="main">
          {activePage ===
            "Home" &&
            homePage}

          {activePage ===
            "AI Generator" && (
            <>
              <section className="hero">
                <div className="hero-copy">
                  <div className="eyebrow">
                    <span className="eyebrow-line"></span>
                    AI CONTENT GENERATOR
                  </div>

                  <h1 className="hero-title">
                    Your ideas.
                    <br />
                    <em>
                      <span className="green-text">
                        Made social.
                      </span>
                    </em>
                  </h1>

                  <p className="hero-description">
                    Generate engaging
                    social media
                    content in seconds
                    with Gemini AI.
                  </p>
                </div>

                <div className="hero-visual">
                  <div className="green-orb"></div>

                  <div className="dark-orb"></div>

                  <div className="preview-card">
                    <div className="preview-top">
                      <span>
                        GENERATE
                      </span>

                      <span>
                        AI POWERED
                      </span>
                    </div>

                    <div className="preview-content">
                      <div className="preview-small">
                        SOCIALAI
                      </div>

                      <h2 className="preview-heading">
                        Idea
                        <br />
                        → Post
                      </h2>
                    </div>
                  </div>
                </div>
              </section>

              <section
                id="generator"
                className="generator-section"
              >
                <div className="section-label">
                  AI GENERATOR
                </div>

                <h2 className="section-title">
                  Create something
                  <br />
                  <em>
                    worth sharing.
                  </em>
                </h2>

                <p className="section-description">
                  Apni social media post ya idea paste karo,
                  platform choose karo, aur SocialAI usi
                  post ko samajhkar related content Gemini
                  AI se generate karega.
                </p>

                <div className="generator-form">
                  <div>
                    <label
                      htmlFor="generator-topic"
                      className="field-label"
                    >
                      Topic
                    </label>

                    <textarea
                      id="generator-topic"
                      className="topic-input social-post-input"
                      value={topic}
                      onChange={(e) =>
                        setTopic(e.target.value)
                      }
                      placeholder="Apni social media post ya idea yahan paste karo... e.g. Our new summer collection is live. Fresh colours, lightweight styles and everyday looks for the season."
                      disabled={isGenerating}
                      rows={6}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="generator-platform"
                      className="field-label"
                    >
                      Platform
                    </label>

                    <select
                      id="generator-platform"
                      className="platform-select"
                      value={platform}
                      onChange={(e) =>
                        setPlatform(
                          e.target
                            .value
                        )
                      }
                      disabled={
                        isGenerating
                      }
                    >
                      <option value="Instagram">
                        Instagram
                      </option>

                      <option value="Facebook">
                        Facebook
                      </option>

                      <option value="LinkedIn">
                        LinkedIn
                      </option>

                      <option value="Twitter">
                        Twitter
                      </option>
                    </select>
                  </div>

                  <button
                    type="button"
                    className="generate-btn"
                    onClick={
                      generateContent
                    }
                    disabled={
                      isGenerating ||
                      !topic.trim()
                    }
                  >
                    {isGenerating
                      ? "Creating..."
                      : "✦ Generate"}
                  </button>
                </div>

                {message && (
                  <div
                    className={`message ${
                      message
                        .toLowerCase()
                        .includes(
                          "failed"
                        ) ||
                      message
                        .toLowerCase()
                        .includes(
                          "error"
                        )
                        ? "error"
                        : "success"
                    }`}
                  >
                    {message}
                  </div>
                )}

                {selectedContent && (
                  <div className="generated-preview">
                    <div className="generated-preview-header">
                      <h3 className="generated-preview-title">✦ Related Content</h3>
                      <span className="generated-preview-platform">
                        {selectedContent.platform || platform}
                      </span>
                    </div>

                    <div className="generated-preview-block">
                      <span className="generated-preview-label">Caption</span>
                      <div className="generated-preview-text">
                        {selectedContent.caption || selectedContent.body || selectedContent.content || "No caption available."}
                      </div>
                    </div>

                    {selectedContent.hashtags && (
                      <div className="generated-preview-block">
                        <span className="generated-preview-label">Hashtags</span>
                        <div className="generated-preview-text">
                          {selectedContent.hashtags}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </section>
            </>
          )}

          {activePage === "Content" &&
  contentPage}

{activePage === "Calendar" &&
  calendarPage()}

{activePage === "Analytics" &&
  analyticsPage()}

{activePage === "Settings" &&
  <Settings />}

          <footer className="footer">
            <span>
              © 2026 SocialAI · AI
              Content Agent
            </span>

            <span>
              Built with React ·
              FastAPI · Gemini
            </span>
          </footer>
        </main>

        <ContentModal
          content={
            selectedContent
          }
          onClose={() =>
            setSelectedContent(
              null
            )
          }
        />
      </div>
    </>
  );
}

export default App;