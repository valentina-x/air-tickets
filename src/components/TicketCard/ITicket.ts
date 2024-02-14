export interface ITicket {
	id: string;
	from: string;
	to: string;
	company: string;
	company_logo: string;
	price: number;
	currency: string;
	time: {
		startTime: string;
		endTime: string;
	};
	date: string;
	stops: number;
}