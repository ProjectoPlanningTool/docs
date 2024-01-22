import axios from "axios";

const axiosInstance = axios.create({
	baseURL: "https://154gq2lpa4.execute-api.ap-south-1.amazonaws.com",
});

class APIClient<T, U> {
	endpoint: string;
	constructor(endpoint: string) {
		this.endpoint = endpoint;
	}

	post = (data: U) =>
		axiosInstance.post<T>(this.endpoint, data).then((res) => res.data);
}

export default APIClient;
