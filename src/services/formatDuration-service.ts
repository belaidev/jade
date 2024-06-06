export function formatDuration(seconds: number): string {
	const hrs = Math.floor(seconds / 3600);
	const mins = Math.floor((seconds % 3600) / 60);

	const formattedHrs = hrs.toString().padStart(2, "0");
	const formattedMins = mins.toString().padStart(2, "0");

	return `${formattedHrs}:${formattedMins}`;
}
