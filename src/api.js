import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class MinyanApi {
    // the token for interactive with the API will be stored here.
    static token;

    static async request(endpoint, data = {}, method = "get") {
        console.debug("API Call:", endpoint, data, method);

        //there are multiple ways to pass an authorization token, this app passes it in the header.
        const url = `${BASE_URL}/${endpoint}`;
        const headers = { Authorization: `Bearer ${MinyanApi.token}` };
        const params = (method === "get")
            ? data
            : {};

        try {
            return (await axios({ url, method, data, params, headers })).data;
        } catch (err) {
            console.error("API Error:", err.response);
            let message = err.response.data.error.message;
            throw Array.isArray(message) ? message : [message];
        }
    }

    // Individual API routes

    /** Get details on a user. */

    static async getCurrentUser(username) {
        let res = await this.request(`users/${username}`)
        return res.user;
    }

    /** Update user info - nice to have feature. */
    static async update(profileData, username) {
        let res = await this.request(`users/${username}`, profileData, 'patch')
        return res.user;
    }

    /** Get info on specific event */
    static async findEvent(eventId) {
        let res = await this.request(`events/${eventId}`);
        return res.event;
    }

    /** Get all events */
    static async getEvents(data) {
        if (data === '') data = undefined;
        let res = await this.request(`events`, { data });
        return res.events;
    }
    /**Get all locations - filter params*/
    static async getLocations(filter) {
        if (filter === '') return undefined;
        let res = await this.request(`locations`, { filter })
        return res.locations;
    }

    /** New event POST requests */
    static async createEvent(formData) {
        let res = await this.request('events/new', formData, 'post')
        return res.data.event;
    }

    /**Register and login reqests */
    static async signup(formData) {
        let res = await this.request('auth/register', formData, 'post')
        // console.log(res.user)
        return res.token;
    }

    static async login(formData) {
        console.log(formData);
        let res = await this.request('auth/token', formData, 'post')
        console.log(res.token);
        return res.token;
    }

    /** Make a new reservation 
     * how will api handle patch request for updating currentCapacity of an event AND 
     *   post request for a new entry in reservations table? QUESTION!!!
     * How do we pass through user id
    */
    static async newReservation(userId, eventId) {
        let res = await this.request(`events/join/${eventId}`, {}, 'patch');
        console.log(res);
    }
}

// for now, put token ("testuser" / "password" on class)
MinyanApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
    "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
    "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

// const DEFAULT_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc"

export default MinyanApi;