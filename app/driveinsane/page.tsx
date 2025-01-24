'use client'

import s from './page.module.scss'
import cn from 'classnames'
import Link from "next/link"
import { apiQuery } from 'next-dato-utils/api';
import { DraftMode } from 'next-dato-utils/components';
import { Image } from 'react-datocms';
import React from 'react';

export default function Insane() {

  const [mouseX, setMouseX] = React.useState(0);
  const [mouseY, setMouseY] = React.useState(0);

  const handleMouseMove = (e: any) => {
    const x = e.clientX - e.target.getBoundingClientRect().left;
    const y = e.clientY - e.target.getBoundingClientRect().top;
    setMouseX(x);
    setMouseY(y);
    console.log(x, y);
  }
  return (
    <>
      <div className={s.page} onMouseMove={handleMouseMove}>
        <img src="/chip.png" alt="chip" className={cn(s.chip, s.visible)} style={{ left: `${mouseX}px`, top: `${mouseY}px` }} />
      </div>
    </>
  )
}