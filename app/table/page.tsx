'use client'

import HeroTable from '@/components/hero-table'
import store from '@/app/utils/store'
import {Provider} from "react-redux";
export default function Table() {
  return (
    <Provider store={store}>
        <HeroTable />
    </Provider>
  )
}
