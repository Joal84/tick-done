import React, { useState } from "react";

export default function CategortFilter({ onChangeHandler }: any) {
  return (
    <>
      <label htmlFor="category-search">Filter Category</label>
      <select
        id="category-search"
        name="category-search"
        onChange={(e) => onChangeHandler(e.target.value)}
      >
        <option value="all">All</option>
        <option value="None">None</option>
        <option value="Food-and-Pantry">Food and Pantry</option>
        <option value="Health-and-Beauty">Health and Beauty</option>
        <option value="Household">Household</option>
      </select>
    </>
  );
}
