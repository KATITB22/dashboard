import axios, { AxiosInstance } from 'axios';
import Cookies from 'universal-cookie';

class SamitraService {
    API_URL: string = import.meta.env.VITE_SAMITRA_API_URL;

    samitraApi: AxiosInstance;

    token: string = '';

    constructor() {
        this.samitraApi = axios.create({ baseURL: this.API_URL });
        const cookie = new Cookies();
        const cookies = cookie.getAll();
        if (cookies) {
            if (cookies.token) {
                this.token = cookies.token;
            }
        }
    }

    public async submitBan(username: string) {
        try {
            const res = await this.samitraApi.post(
                '/ban-user',
                { identifier: username },
                {
                    headers: {
                        Authorization: `Bearer ${this.token}`,
                    },
                }
            );

            return res;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    public async getBanList() {
        try {
            const res = await this.samitraApi.get('/ban-user', {
                headers: {
                    Authorization: `Bearer ${this.token}`,
                },
            });

            return res.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    public async getReports() {
        try {
            const unseenRes = await this.samitraApi.get('/reports/unseen', {
                headers: {
                    Authorization: `Bearer ${this.token}`,
                },
            });
            const seenRes = await this.samitraApi.get('/reports/seen', {
                headers: {
                    Authorization: `Bearer ${this.token}`,
                },
            });
            const reports = [
                ...unseenRes.data.reports,
                ...seenRes.data.reports,
            ];
            return { reports };
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    public async markSeen(id: number) {
        try {
            await this.samitraApi.post(
                '/reports/mark-seen',
                { id },
                {
                    headers: {
                        Authorization: `Bearer ${this.token}`,
                    },
                }
            );
        } catch (error) {
            console.error(error);
        }
    }
}

const samitraService = new SamitraService();
export default samitraService;
