import axios from "axios";

const SERVER_URL = "http://localhost:9000"

export const getAllContacts = () => {
    let url = `${SERVER_URL}/contacts`
    return axios.get(url)
}

export const getContact = (contactId) => {
    let url = `${SERVER_URL}/contacts/${contactId}`
    return axios.get(url)
}

export const getAllgroup = () => {
    let url = `${SERVER_URL}/group`
    return axios.get(url)
}

export const getGroup = (groupId) => {
    let url = `${SERVER_URL}/group/${groupId}`
    return axios.get(url)
}

export const createContact = (contact) => {
    let url = `${SERVER_URL}/contacts`
    return axios.post(url, contact)
}

export const updateContact = (contact, contactId) => {
    let url = `${SERVER_URL}/contacts/${contactId}`
    return axios.put(url, contact)
}

export const deleteContact = (contactId) => {
    let url = `${SERVER_URL}/contacts/${contactId}`
    return axios.delete(url)
}