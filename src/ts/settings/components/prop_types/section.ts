import { o_inputs } from '@loftyshaky/shared-app/inputs';

export interface Section {
    section_name: string;
    section?: o_inputs.Section;
    children: React.ReactNode;
}
