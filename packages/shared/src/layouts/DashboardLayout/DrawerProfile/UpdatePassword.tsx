import { Button } from 'bone-ui'
import { Box } from '@fower/react'
import { apiService } from '@ai-translator/api-sdk'
import { Popover, PopoverContent, PopoverTrigger, toast, usePopoverContext } from 'bone-ui'
import { PencilSolid } from '@bone-ui/icons'
import { Form, useForm } from 'fomir'
import { getUser } from '../../../stores'

export const UpdatePassword = () => {
  const user = getUser()
  return (
    <Popover>
      <PopoverTrigger>
        <Box as="a" toCenterY>
          <PencilSolid square4 />
          <Box>Update password</Box>
        </Box>
      </PopoverTrigger>
      <PopoverContent p5 w-320>
        <Box textXL fontBold mb4>
          Change password
        </Box>
        <Box>
          <UpdatePasswordForm></UpdatePasswordForm>
        </Box>
      </PopoverContent>
    </Popover>
  )
}

interface Values {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

function UpdatePasswordForm() {
  const { close } = usePopoverContext()
  const form = useForm<Values>({
    async onSubmit(values) {
      const toaster = toast.loading('Updating...', { showLayer: true })
      try {
        await apiService.modifyPassword({
          oldPassword: values.currentPassword,
          newPassword: values.currentPassword,
        })

        toaster.update('Updated', { type: 'success' })
        close()
      } catch (error) {
        toaster.dismiss()
      }
    },
    children: [
      {
        label: 'Current password',
        component: 'Input',
        name: 'currentPassword',
        validators: {
          required: 'Please input current password',
        },
      },
      {
        label: 'New password',
        component: 'Input',
        name: 'newPassword',
        validators: {
          required: 'Please input new password',
          minLength: [6, 'Password must be at least 6 characters long'],
        },
      },
      {
        label: 'Confirm password',
        component: 'Input',
        name: 'confirmPassword',
        validators: {
          required: 'Please confirm new password',
          minLength: [6, 'Password must be at least 6 characters long'],
          equalTo: ['newPassword', 'The passwords entered twice are inconsistent'],
        },
      },
    ],
  })
  return (
    <Form
      form={form}
      suffix={
        <Box toCenterY toRight spaceX2>
          <Button variant="light" onClick={close}>
            Cancel
          </Button>
          <Button type="submit">Save</Button>
        </Box>
      }
    />
  )
}
