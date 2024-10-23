import BotTable from '@/app/ui/bots/table';
import { fetchBotsData } from '@/app/lib/data';

export default async function Page() {
	const botsData = await fetchBotsData();
	const data = botsData.data;
	return (
		<main>
			<BotTable bots={data}/>
		</main>
	)
}
