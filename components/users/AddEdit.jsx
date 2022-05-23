import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { Link } from 'components';
import { userService, alertService } from 'services';

export { AddEdit };

function AddEdit(props) {
    const user = props?.user;
    const isAddMode = !user;
    const router = useRouter();
    
    // form validation rules 
    const validationSchema = Yup.object().shape({
        tituloProyecto: Yup.string()
            .required('Título del Proyecto es requerido'),
        descripcionProyecto: Yup.string()
            .required('Decripción del Proyecto es requerido'),
        liderProyecto: Yup.string()
            .required('Líder del Proyecto es requerido'),
        responsableProyecto: Yup.string()
            .required('Responsable del Proyecto es requerido'),
        nivelAutoridad: Yup.string()
            .required('Nivel de Autoridad es requerido'),
        clasificacion: Yup.string()
            .required('Clasificación es requerido'),
        objetivoAlcance: Yup.string()
            .required('Objetivo y Alcance es requerido'),
        reqInteresados: Yup.string()
            .required('Requerimientos de los interesados es requerido'),
        reqAdicionales: Yup.string()
            .required('Requerimientos Adicionales es requerido'),    
        desEntregables: Yup.string()
            .required('Descripción de los entregables es requerido'), 
        clientesSistema: Yup.string()
            .required('Clientes del Sistema es requerido'),
        versiones: Yup.string()
            .required('Versiones del Proyecto es requerido'),
        naturalezaCambio: Yup.string()
            .required('Naturaleza del cambio del Proyecto es requerido'),
        fechaAprobacion: Yup.date()
            .required('Fecha de Aprobación es requerido'),
        reqServidor: Yup.string()
            .required('Requisitos del Servidor es requerido'),
        reqCliente: Yup.string()
            .required('Requisitos del Cliente es requerido'),
        lengProgramacion: Yup.string()
            .required('Lenguaje de programación es requerido'),
        versionLenguage: Yup.string()
            .required('Versiones del lenguaje es requerido'),
        componentes: Yup.string()
            .required('Componentes es requerido'),
        integraciones: Yup.string()
            .required('Detalles de las integraciones es requerido'),
        seguridad: Yup.string()
            .required('Detalles de seguridad es requerido'),
        enlacePlataforma: Yup.string().url()
            .required('Enlace de la plataforma es requerido'),
        desReplica: Yup.string()
            .required('Descripción de la réplica es requerido'), 
        fecha: Yup.date()
            .required('Fecha de actualizacion es requerido'), 
        
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // set default form values if in edit mode
    if (!isAddMode) {
        formOptions.defaultValues = props.user;
    }

    // get functions to build form with useForm() hook
    const { register, handleSubmit, reset, formState } = useForm(formOptions);
    const { errors } = formState;

    function onSubmit(data) {
        return isAddMode
            ? createUser(data)
            : updateUser(user.id, data);
    }

    function createUser(data) {
        return userService.register(data)
            .then(() => {
                alertService.success('User added', { keepAfterRouteChange: true });
                router.push('.');
            })
            .catch(alertService.error);
    }

    function updateUser(id, data) {
        return userService.update(id, data)
            .then(() => {
                alertService.success('User updated', { keepAfterRouteChange: true });
                router.push('..');
            })
            .catch(alertService.error);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="shadow-lg w-75 p-5">
            <div className="form-row">
                <div className="form-group col">
                    <label>Título del Proyecto</label>
                    <input name="firstName" type="text" {...register('tituloProyecto')} className={`form-control ${errors.tituloProyecto? 'is-invalid' : 'form-control-lg'}`} />
                    <div className="invalid-feedback">{errors.firstName?.message}</div>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col">
                <label className="form-label">Descripción del Proyecto</label>
                <textarea className={`form-control ${errors.tituloProyecto? 'is-invalid' : 'form-control-lg'}`} type="text" {...register('descripcionProyecto')} id="exampleFormControlTextarea1" rows="5"></textarea>
                    <div className="invalid-feedback">{errors.email?.message}</div>
                </div>
            </div>
            <div className="form-group">
            <div className="form-row">
                <div className="form-group col col-xs-4">
                <label>Líder del Proyecto</label>
                    <input name="username" type="text" {...register('username')} className={`form-control ${errors.email ? 'is-invalid' : 'form-control-lg'}`} />
                    <div className="invalid-feedback">{errors.email?.message}</div>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col">
                <label>Responsable del proyecto de la Unidad</label>
                    <input name="username" type="text" {...register('username')} className={`form-control ${errors.email ? 'is-invalid' : 'form-control-lg'}`} />
                    <div className="invalid-feedback">{errors.email?.message}</div>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col">
                <label>Nivel de Autoridad</label>
                    <select className="form-control" id="exampleFormControlSelect1">
                    <option>Pasante</option>
                    <option>Administrador</option>
                    </select>
                    <div className="invalid-feedback">{errors.email?.message}</div>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col">
                <label>Clasificación</label>
                    <select className="form-control" id="exampleFormControlSelect1">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    </select>
                    <div className="invalid-feedback">{errors.email?.message}</div>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col">
                <label>Objetivo y alcance</label>
                    <input name="username" type="text" {...register('username')} className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.email?.message}</div>
                </div>
            </div>
            <h4>Requerimientos</h4>
            <div className="form-row">
                <div className="form-group col">
                <label>Requerimientos de los interesados</label>
                    <input name="username" type="text" {...register('username')} className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.email?.message}</div>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col">
                <label>Requerimientos Adicionales</label>
                    <input name="username" type="text" {...register('username')} className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.email?.message}</div>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col">
                <label>Descripción de los entregables</label>
                    <input name="username" type="text" {...register('username')} className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.email?.message}</div>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col">
                <label>Clientes del Sistema</label>
                    <input name="username" type="text" {...register('username')} className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.email?.message}</div>
                </div>
            </div>
            <h4>Historia de modificaciones</h4>
            <div className="form-row">
                <div className="form-group col">
                <label>Versiones</label>
                    <input name="username" type="text" {...register('username')} className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.email?.message}</div>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col">
                <label>Naturaleza del cambio</label>
                    <input name="username" type="text" {...register('username')} className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.email?.message}</div>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col">
                <label>Fecha de Aprobación</label>
                    <input name="username" type="text" {...register('username')} className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.email?.message}</div>
                </div>
            </div>
            <h4>Requerimientos Técnicos del Sistema</h4>
            <div className="form-row">
                <div className="form-group col">
                <label>Requisitos del Servidor</label>
                    <input name="username" type="text" {...register('username')} className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.email?.message}</div>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col">
                <label>Requisitos del Cliente</label>
                    <input name="username" type="text" {...register('username')} className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.email?.message}</div>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col">
                <label>Lenguaje de programación utilizado</label>
                    <input name="username" type="text" {...register('username')} className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.email?.message}</div>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col">
                <label>Versiones del lenguaje</label>
                    <input name="username" type="text" {...register('username')} className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.email?.message}</div>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col">
                <label>Componentes utilizados</label>
                    <input name="username" type="text" {...register('username')} className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.email?.message}</div>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col">
                <label>Detalle de las integraciones</label>
                    <input name="username" type="text" {...register('username')} className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.email?.message}</div>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col">
                <label>Infraestructura</label>
                    <input name="username" type="text" {...register('username')} className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.email?.message}</div>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col">
                <label>Seguridad</label>
                    <input name="username" type="text" {...register('username')} className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.email?.message}</div>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col">
                <label>Enlace de la plataforma</label>
                    <input name="username" type="text" {...register('username')} className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.email?.message}</div>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col">
                <label>Descripción de la réplica</label>
                    <input name="username" type="text" {...register('username')} className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.email?.message}</div>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col">
                <label>Fecha</label>
                    <input name="username" type="text" {...register('username')} className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.email?.message}</div>
                </div>
            </div>
                <button type="submit" disabled={formState.isSubmitting} className="btn btn-primary mr-2">
                    {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                    Guardar
                </button>
                <button onClick={() => reset(formOptions.defaultValues)} type="button" disabled={formState.isSubmitting} className="btn btn-secondary">Reset</button>
                <Link href="/users" className="btn btn-link">Cancelar</Link>
            </div>
        </form>
    );
}