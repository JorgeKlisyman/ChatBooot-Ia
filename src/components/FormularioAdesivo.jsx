import React, { useState } from 'react';
import '../index.css';

function FormularioAdesivo({ onSubmit }) {
  const [form, setForm] = useState({ nome: '', email: '', telefone: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm({ nome: '', email: '', telefone: '' });
  };

  return (
    <form className="formulario-adesivo" onSubmit={handleSubmit}>
      <input
        type="text"
        name="nome"
        placeholder="Nome"
        value={form.nome}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
      />
      <input
        type="tel"
        name="telefone"
        placeholder="Telefone"
        value={form.telefone}
        onChange={handleChange}
        required
      />
      <button type="submit" className="enviar-formulario">
        Enviar
      </button>
    </form>
  );
}

export default FormularioAdesivo;
