import { useState } from 'react'
const types = [['full_time', 'Full time'], ['part_time', 'Part time'], ['contract', 'Contract'], ['internship', 'Internship'], ['remote', 'Remote']]
const initial = { title: '', company: '', location: '', job_type: 'full_time', description: '', salary: '', is_active: true }
export default function JobForm({ job, onSubmit, submitting }) {
  const [values, setValues] = useState(job ? { ...job, salary: job.salary ?? '' } : initial)
  const [errors, setErrors] = useState({})
  const change = e => setValues(v => ({ ...v, [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }))
  const submit = async e => { e.preventDefault(); setErrors({}); try { await onSubmit({ ...values, salary: values.salary === '' ? null : values.salary }) } catch (error) { setErrors(error.response?.data || { non_field_errors: ['Unable to save this job.'] }) } }
  return <form className="job-form" onSubmit={submit}>{errors.non_field_errors && <p className="form-error">{errors.non_field_errors.join(' ')}</p>}
    {[['title', 'Job title'], ['company', 'Company'], ['location', 'Location']].map(([name, label]) => <label key={name}>{label}<input name={name} value={values[name]} onChange={change} required />{errors[name] && <span className="field-error">{errors[name].join(' ')}</span>}</label>)}
    <label>Job type<select name="job_type" value={values.job_type} onChange={change}>{types.map(([value, label]) => <option value={value} key={value}>{label}</option>)}</select>{errors.job_type && <span className="field-error">{errors.job_type.join(' ')}</span>}</label>
    <label>Description<textarea name="description" value={values.description} onChange={change} required rows="7" />{errors.description && <span className="field-error">{errors.description.join(' ')}</span>}</label>
    <label>Salary (optional)<input type="number" min="0" step="0.01" name="salary" value={values.salary} onChange={change} />{errors.salary && <span className="field-error">{errors.salary.join(' ')}</span>}</label>
    <label className="checkbox"><input type="checkbox" name="is_active" checked={values.is_active} onChange={change} /> Active listing</label>
    <button className="button" disabled={submitting}>{submitting ? 'Saving...' : 'Save job'}</button>
  </form>
}
