import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getMe, logoutUser, signinUser, signupUser } from '../api/auth.api'
import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'
import type { User } from '../types'

export const useUser = () => {
  return useQuery<User>({
    queryKey: ['me'],
    queryFn: getMe,
    retry: false,
  })
}

export const useSignin = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: signinUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['me'] })
      navigate({ to: '/' })
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })
}

export const useSignup = () => {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: signupUser,
    onSuccess: () => {
      navigate({ to: '/signin' })
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })
}

export const useLogout = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      queryClient.clear()
      navigate({ to: '/signin' })
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })
}
