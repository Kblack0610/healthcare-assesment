/**
 * @fileoverview Shared type definitions for the Healthcare Management System.
 * This file provides JSDoc type definitions for the Node.js backend.
 * For TypeScript projects, import from types.ts instead.
 */

/**
 * @typedef {Object} Patient
 * @property {number} id
 * @property {string} name
 * @property {number} [age]
 * @property {string} [gender]
 * @property {string} [medicalHistory]
 */

/**
 * @typedef {Object} Doctor
 * @property {number} id
 * @property {string} name
 * @property {string} specialty
 * @property {string} [bio]
 */

/**
 * @typedef {Object} Appointment
 * @property {number} id
 * @property {number} patientId
 * @property {number} doctorId
 * @property {string} dateTime
 * @property {string} [reason]
 */

module.exports = {};
