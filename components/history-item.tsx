'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Chat } from '@/lib/types'
import { cn } from '@/lib/utils'

type HistoryItemProps = {
  chat: Chat
}

const formatDateWithTime = (date: Date | string) => {
  const parsedDate = new Date(date)
  const now = new Date()
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)

  if (
    parsedDate.getDate() === now.getDate() &&
    parsedDate.getMonth() === now.getMonth() &&
    parsedDate.getFullYear() === now.getFullYear()
  ) {
    return `Today, ${parsedDate.getHours()}:${parsedDate
      .getMinutes()
      .toString()
      .padStart(2, '0')}`
  } else if (
    parsedDate.getDate() === yesterday.getDate() &&
    parsedDate.getMonth() === yesterday.getMonth() &&
    parsedDate.getFullYear() === yesterday.getFullYear()
  ) {
    return `Yesterday, ${parsedDate.getHours()}:${parsedDate
      .getMinutes()
      .toString()
      .padStart(2, '0')}`
  } else {
    return parsedDate.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    })
  }
}

const HistoryItem: React.FC<HistoryItemProps> = ({ chat }) => {
  const pathname = usePathname()
  const isActive = pathname === chat.path

  return (
    <Link
      href={chat.path}
      className={cn(
        'flex flex-col hover:bg-muted cursor-pointer p-2 rounded border',
        isActive ? 'bg-muted/70 border-border' : 'border-transparent'
      )}
    >
      <div className="text-xs font-medium truncate select-none">
        {chat.title}
      </div>
      <div className="text-xs text-muted-foreground">
        {formatDateWithTime(chat.createdAt)}
      </div>
    </Link>
  )
}

export default HistoryItem
