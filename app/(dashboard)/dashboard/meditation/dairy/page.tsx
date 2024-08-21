'use client'

import { Button } from '@/components/ui/button';
import { ArrowDownLeftIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { QuoteCard } from './quote-card';
import axios from 'axios';
import { PageHeader, PageHeaderHeading } from '@/components/page-header';

export default function Page() {
  const [quoteData, setQuoteData] = useState({ quote: '', author: '' });

  useEffect(() => {
    const fetchData = async () => {


      const category = 'happiness';
      
      try {
        const response = await axios.get(
          `https://api.api-ninjas.com/v1/quotes?category=${category}`,
          {
            headers: {
              'X-Api-Key': 'f2ZEnBdgKFSri+MHpCv5sw==m24YhZnvNLY6hRk9',
              'Content-Type': 'application/json',
            },
          }
        );

        const { quote, author } = response.data[0];

        

        console.log(response);

        

        setQuoteData({ quote, author });
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []); 

  return (
    <div className='m-auto'>
      <div className='p-4 flex space-x-5'>
        <PageHeader id='billing-header' aria-labelledby='billing-header-heading'>
          <PageHeaderHeading size='sm'>Motivación diaria</PageHeaderHeading>
        </PageHeader>
        <Link href='/dashboard/meditation' className='mr-2'>
          <Button size='sm' className='p-2' variant='outline'>
            <ArrowDownLeftIcon className='h-4 w-4 m-2 mr-2' />
            Todas las meditaciones
          </Button>
        </Link>
      </div>
      <Separator />
      <div className='m-auto p-2'>
        <QuoteCard quote={quoteData.quote} author={quoteData.author} />
      </div>
    </div>
  );
}
