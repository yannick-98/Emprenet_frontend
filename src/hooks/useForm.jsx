import { useState } from 'react'

const useForm = (Obj = {}) => {
    const [form, setForm] = useState(Obj)

    const changed = ({ target }) => {
        const { name, value } = target
        setForm({ ...form, [name]: value })
    }

    return { form, changed }
}

export default useForm
