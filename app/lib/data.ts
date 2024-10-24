import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

import {
	Bot,
	Worker,
	Log,
} from './definitions';

const PAGE_SIZE = 5;

/**
 * this is just the mock service to interact with the file system
 * for the real solution it would need connection to a DBMS or cloud service
*/


const logPath = resolve('./data/logs.json');
console.log(`logPath: "${logPath}"`)
const workerPath = resolve('./data/workers.json');
const botPath = resolve('./data/bots.json');

/*
 * @returns {Promise<Bot>}
 * @description fetch all bots from the file system
 */
export async function fetchBots() {
	const data = await readFile(botPath, 'utf-8');
	const bots: Bot[] = JSON.parse(data);
	return bots;
}

export async function fetchBotNameById(id: string) {
	const bots = await fetchBots();
	const bot = bots.find((bot) => bot.id === id);
	return bot ? bot.name : '';
}

/*
 * @param bot
 * @returns {Promise<Worker[]>}
 * @description fetch workers from the file system based on the input data
 */
export async function fetchWorkers({ bot }:{ bot?: string }) {
	const data = await readFile(workerPath, 'utf-8');
	const workers: Worker[] = JSON.parse(data);
	// filter by id of exists
	return workers.filter((worker) => !bot ? true : worker.bot === bot);
}

export async function fetchWorkerNameById(id: string) {
	const workers = await fetchWorkers({});
	const worker = workers.find((worker) => worker.id === id);
	return worker ? worker.name : '';
}

/*
 * @param bot
 * @param worker
 * @returns {Promise<Log[]>}
 * @description fetch logs from the file system based on the input data
 */
export async function fetchLogs({ bot, worker }: { bot?: string, worker?: string }) {
	const data = await readFile(logPath, 'utf-8');
	const logs: Log[] = JSON.parse(data);
	// filter by id of exists
	return logs.filter((log) => {
		if (bot && log.bot !== bot) {
			return false;
		}
		if (worker && log.worker !== worker) {
			return false;
		}
		return true;
	});
}

export async function fetchLogById(id: string) {
	const logs = await fetchLogs({});
	return logs.find((log) => log.id === id);
}


export async function getTotalBots() {
	return (await fetchBots()).length;
}

export async function getTotalWorkers() {
	return (await fetchWorkers({})).length;
}

export async function getTotalLogs() {
	return (await fetchLogs({})).length;
}

export async function fetchBotById(id: string) {
	const bots = await fetchBots();
	return bots.find((bot) => bot.id === id);
}

/*
 * @returns {Promise<FormattedBotTable[]>}
 * @description returns data suitable for table display, no need fro pagination here...
 */
export async function fetchBotsData() {
	const bots = await fetchBots();
	const workers = await fetchWorkers({});
	const logs = await fetchLogs({});

	console.log(workers)

	const botsData = bots.map((bot) => {
		return {
			...bot,
			total_workers: workers.filter((worker) => worker.bot === bot.id).length,
			total_logs: logs.filter((log) => log.bot === bot.id).length,
		};
	});

	return {
		data: botsData,
		pages: 1,
		page: 1
	}
}

function applyPage<T>(list: T[], page: number) {
	const pageSize = PAGE_SIZE;
	const start = (page - 1) * pageSize;
	const end = start + pageSize;
	return list.slice(start, end);
}

/*
 * @param params { bot: string }
 * @return {Promise<FormattedWorkerTable[]>}
 * @description returns data suitable for table display
 */
export async function fetchWorkersData(params:{ bot?:string, page?:string }) {
	const botId = params.bot;
	const page = Number(params.page || 1);
	const bots = await fetchBots();
	const workers = await fetchWorkers({ bot: botId });
	const logs = await fetchLogs({ bot: botId });

	function getBotName(worker: Worker) {
		const bot = bots.find((bot) => bot.id === worker.bot);
		return bot ? bot.name : '';
	}

	const workersFiltered = workers.map((worker) => {
		return {
			...worker,
			total_logs: logs.filter((log) => log.worker === worker.id).length,
			botName: getBotName(worker)
		};
	});

	return {
		data: applyPage(workersFiltered, page).sort((a,b) => a.created - b.created),
		page,
		pages: Math.ceil(workersFiltered.length / PAGE_SIZE),
	}
}

function filterByQuery<T extends Record<string, string|number>>(col: T[], query: string, fields: (keyof T)[]) {
	return col.filter((item) => {
		return fields.some((field) => {
			const value = item[field];
			if (typeof value === 'string') {
				return value.toLowerCase().includes(query.toLowerCase());
			}
			return false;
		});
	});
}



/*
 * @param params { bot: string, worker: string, page: string }
 * @retrn {Promise<Log[]>}
 */
export async function fetchLogsData(params: { bot?: string, worker?: string, page?: string, query?: string}) {
	const allBots = await fetchBots();
	const allWorkers = await fetchWorkers({});
	const botId = params.bot;
	const workerId = params.worker;
	const page = Number(params.page || 1);
	const query = params.query;
	const logs = await fetchLogs({ bot: botId, worker: workerId });
	const logData = logs.map((log) => ({
		...log,
		botName: allBots.find((bot) => bot.id === log.bot)?.name || '',
		workerName: allWorkers.find((worker) => worker.id === log.worker)?.name || '',
	}));


	const filteredLogs = !query
		? logData
		: filterByQuery(logData, query, ['message', 'botName', 'workerName']);

	console.log(filteredLogs)

	return {
		data: applyPage(filteredLogs.sort((a,b) => a.created - b.created), page),
		page,
		pages: Math.ceil(filteredLogs.length / PAGE_SIZE)
	}
}
