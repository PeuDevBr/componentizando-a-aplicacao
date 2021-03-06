import { useEffect, useState } from 'react';
import { Button } from './Button';

import { GenreResponseProps, MovieProps } from '../App';
import { api } from '../services/api';

interface OnSideBarProps {
  setSelectedGenreId: (id: number) => void;
  selectedGenreId: number;
}


export function SideBar({setSelectedGenreId, selectedGenreId}: OnSideBarProps) {
  // Complete aqui

  const [genres, setGenres] = useState<GenreResponseProps[]>([]);


  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);



  function handleClickButton(id: number) {
    setSelectedGenreId(id);
  }

  return (
    <nav className="sidebar">
      <span>Watch<p>Me</p></span>

      <div className="buttons-container">
        {genres.map(genre => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => handleClickButton(genre.id)}
            selected={selectedGenreId === genre.id}
          />
        ))}
      </div>

    </nav>
  )
}