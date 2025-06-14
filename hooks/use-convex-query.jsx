 import { useState, useEffect } from 'react';
 import { toast } from 'sonner';
 import { useQuery, useMutation } from 'convex/react';
 export const useConvexQuery = (query,...args)=>{
    const result = useQuery(query, ...args);
    const [data, setData]= useState(undefined);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    useEffect (()=>{
        if(result=== undefined){
            setIsLoading(true);
        }
        else{
            try{
                setData(result);
                setError(null);
            } catch (err){
                setError(err);
                toast.error(err.message);
            } finally{
                setIsLoading(false);
            }
        }

    }, [result]);
    return { data, error, isLoading };
}
export const useConvexMutation = (mutation,...args)=>{
    const mutationFn = useMutation(mutation);
    const [data, setData]= useState(undefined);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
   
  const mutate= async (...args)=> {
    setIsLoading(true);
    setError(null);
    try{
        const response= await mutationFn(...args);
        setData(response);
        return response;
    } catch (err){
        setError(err);
        toast.error(err.message);
    } finally{
        setIsLoading(false);
    }
  }
  return { mutate, data, error, isLoading };
}