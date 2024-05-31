import { FunctionComponent } from "react";
import {
	Input,
	Label,
	RadioGroup,
	RadioGroupItem,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from "shadcn/components/ui";
import { CreatePersonDto } from "../dtos";

export type CreatePersonFieldsProps = {
	issues: Partial<Record<keyof CreatePersonDto, string>> | undefined;
};

export const CreatePersonFields: FunctionComponent<CreatePersonFieldsProps> = ({ issues }) => {
	return (
		<>
			{/* First name field */}
			<Label className="flex flex-col gap-2">
				{"Prénom"}
				<Input placeholder={"Mike"} type="text" name="firstName" />
				<p className="small muted leading-tight text-red-500">{issues?.firstName}</p>
				<p className="small muted leading-tight">{"Peut être constitué d'une initiale"}</p>
			</Label>

			{/* Last name field */}
			<Label className="flex flex-col gap-2">
				{"Nom de famille (facultatif)"}
				<Input placeholder={"Hunt"} type="text" name="lastName" />
				<p className="small muted leading-tight text-red-500">{issues?.lastName}</p>
				<p className="small muted flex leading-tight">{"Peut être constitué d'une initiale"}</p>
			</Label>

			{/* Pronoun field */}
			<Label className="flex flex-col gap-2">
				{"Quel pronom préférez-vous ?"}
				<RadioGroup className="grid grid-cols-2" name="pronoun">
					<Label className="flex gap-2">
						<RadioGroupItem value="il" />
						Il
					</Label>
					<Label className="flex gap-2">
						<RadioGroupItem value="elle" />
						Elle
					</Label>
				</RadioGroup>
				<p className="small muted leading-tight text-red-500">{issues?.pronoun}</p>
			</Label>

			{/* Occupation field */}
			<Label className="flex flex-col gap-2">
				{"Quelle occupation vous décrit le mieux actuellement ?"}
				<Select name="occupation">
					<SelectTrigger>
						<SelectValue placeholder="Choisir une occupation" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="professionnel">Professionnel</SelectItem>
						<SelectItem value="étudiant">Étudiant</SelectItem>
						<SelectItem value="entrepreneur">Entrepreneur</SelectItem>
						<SelectItem value="hobbyist">Hobbyist</SelectItem>
					</SelectContent>
				</Select>
				<p className="small muted leading-tight text-red-500">{issues?.occupation}</p>
			</Label>
		</>
	);
};
