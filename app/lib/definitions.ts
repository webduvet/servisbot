// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.
export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Customer = {
  id: string;
  name: string;
  email: string;
  image_url: string;
};

export type Invoice = {
  id: string;
  customer_id: string;
  amount: number;
  date: string;
  // In TypeScript, this is called a string union type.
  // It means that the "status" property can only be one of the two strings: 'pending' or 'paid'.
  status: 'pending' | 'paid';
};

export type Revenue = {
  month: string;
  revenue: number;
};

export type LatestInvoice = {
  id: string;
  name: string;
  image_url: string;
  email: string;
  amount: string;
};

// The database returns a number for amount, but we later format it to a string with the formatCurrency function
export type LatestInvoiceRaw = Omit<LatestInvoice, 'amount'> & {
  amount: number;
};

export type InvoicesTable = {
  id: string;
  customer_id: string;
  name: string;
  email: string;
  image_url: string;
  date: string;
  amount: number;
  status: 'pending' | 'paid';
};

export type BotTableType = {
	id: string;
	name: string;
	description: string;
	total_workers: number;
	created: string;
	status: string;
	total_logs: number;
};

export type FormattedBotTable = {
	id: string;
	name: string;
	description: string;
	total_workers: number;
	created: number;
	status: string;
	total_logs: number;
};

export type WorkerTableType = {
	id: string;
	name: string;
	description: string;
	total_logs: number;
	botName: string;
}

export type FormattedWorkerTable = {
	id: string;
	name: string;
	description: string;
	created: string;
	botName: string;
	total_logs: number;
};

export type LogTableType = {
	id: string;
	message: string;
	created: number;
	botName: string;
	workerName: string;
}

export type FormattedLogTable = {
	id: string;
	message: string;
	created: number;
	botName: string;
	workerName: string;
};


export type Bot = {
	id: string,
	created: number,
	name: string,
	description: string,
	status: string
}

export type Worker = {
	id: string,
	created: number,
	name: string,
	description: string,
	bot: string
}

export type Log = {
	id: string,
	created: number,
	message: string,
	bot: string,
	worker: string
}
