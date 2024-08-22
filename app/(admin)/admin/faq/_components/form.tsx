
// 'use client'

// import * as React from 'react';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { generateReactHelpers } from '@uploadthing/react/hooks';
// import { useForm } from 'react-hook-form';
// import { z } from 'zod';
// import { Button } from '@/components/ui/button';
// import {
//   Form,
//   FormControl,
//   FormItem,
//   FormLabel,
// } from '@/components/ui/form';
// import { Input } from '@/components/ui/input';
// import { Textarea } from '@/components/ui/textarea';
// import { addfaqAction } from '@/app/actions/faq';
// import toast from 'react-hot-toast';
// import { SplineIcon } from 'lucide-react';


// export const faQSchema = z.object({
//     question: z.string().min(1, {
//       message: "Must be at least 1 character",
//     }),
//     answer: z.string().min(1),
//   });


// type Inputs = z.infer<typeof faQSchema>;


// export function AddfaqForm() {

//   const [isPending, startTransition] = React.useTransition();

//   const form = useForm<Inputs>({
//     resolver: zodResolver(faQSchema),
//     defaultValues: {
//       question: '',
//       answer: ''
//     },
//   });

//   function onSubmit(data: Inputs) {
//     startTransition(async () => {
//       try {
       
//         const result = await addfaqAction({
//           ...data,
//         });

//         if (result.success === true) {
//           toast.success('faq added successfully.');
//           form.reset();
//         } else {
//           toast.error(result.message);
//         }
//       } catch (err) {
        
//       }
//     });
//   }

//   return (
//     <Form {...form}>
//       <form
//         className='grid w-full max-w-2xl gap-5'
//         onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
//       >
//         <FormItem>
//           <FormLabel>Question</FormLabel>
//           <FormControl>
//             <Input
//               placeholder='Type question'
//               {...form.register('question')}
//             />
//           </FormControl>
//         </FormItem>
//         <FormItem>
//           <FormLabel>Answer</FormLabel>
//           <FormControl>
//             <Textarea
//               placeholder='Type the answer.'
//               {...form.register('answer')}
//             />
//           </FormControl>
        
//         </FormItem>
        
//         <Button className='w-fit' disabled={isPending}>
//           {isPending && (
//             <SplineIcon
//               className='mr-2 h-4 w-4 animate-spin'
//               aria-hidden='true'
//             />
//           )}
//           Add faq
//         </Button>
//       </form>
//     </Form>
//   );
// }
