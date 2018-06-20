import { Entity } from '../model/Entity'
import { DAO } from '../dao/DAO'
declare const hx: any;

export abstract class Form<T extends Entity<T>> {

    private formDAO: DAO<T>;
    private refresh: () => void;

    constructor(formDAO: DAO<T>, refresh: () => void) {
        this.formDAO = formDAO;
        this.refresh = refresh;
    }
    
    async save(data: object): Promise<void> {
        try {
            await this.formDAO.post(this.createFromFormData(data));
            await this.refresh();
        }
        catch (err) {
            hx.notify.warning(err.toString());
            console.log(err);
            return;
        }
    }

    abstract createFromFormData(formData: object): T;


}