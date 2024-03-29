'use client'

import React from "react";

import HeroSignedin from '@/components/hero-signedin'
import store from '@/app/utils/store'
import {Provider} from "react-redux";

export default function Home() {
  return (
    <Provider store={store}>
      <HeroSignedin />
    </Provider>
  );
}
