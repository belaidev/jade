export default function Card() {
	const imageCard = ""; //Url de l'image ?
	const titleCard = ""; //Titre de la carte
	const authorCard = ""; //Auteur de la formation
	const ratingCard = ""; // note de la formation
	const durationCard = ""; // durée de la formation
	const priceCard = ""; // prix de la formation

	return (
		//exemple de Card

		<div className="max-w-sm overflow-hidden rounded shadow-lg">
			<img className="w-full" src={imageCard} alt="" />
			<div className="px-6 py-4">
				<div className="mb-2 text-xl font-bold">{titleCard}</div>
				<p className="text-base text-gray-700">
					{authorCard}
					<br />
					{ratingCard}
					<br />
					{durationCard}
					<br />
					{priceCard}
				</p>
			</div>
		</div>
	);
}
