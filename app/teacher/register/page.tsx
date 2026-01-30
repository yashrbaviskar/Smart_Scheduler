"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { X, Plus, GraduationCap, Calendar, Clock, ArrowLeft, Award } from "lucide-react"
import Link from "next/link"

interface AvailabilitySlot {
  day: string
  startTime: string
  endTime: string
}

interface TeacherProfile {
  fullName: string
  email: string
  phone: string
  bio: string
  experience: string
  location: string
  availability: AvailabilitySlot[]
}

const EXPERIENCE_LEVELS = ["Less than 1 year", "1-2 years", "3-5 years", "5-10 years", "10+ years"]

const DAYS_OF_WEEK = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

const TIME_SLOTS = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
]

export default function TeacherRegisterPage() {
  const [profile, setProfile] = useState<TeacherProfile>({
    fullName: "",
    email: "",
    phone: "",
    bio: "",
    experience: "",
    location: "",
    availability: [],
  })

  const [newAvailability, setNewAvailability] = useState({
    day: "",
    startTime: "",
    endTime: "",
  })

  const addAvailabilitySlot = () => {
    if (newAvailability.day && newAvailability.startTime && newAvailability.endTime) {
      const slot = { ...newAvailability }
      if (
        !profile.availability.some(
          (a) => a.day === slot.day && a.startTime === slot.startTime && a.endTime === slot.endTime,
        )
      ) {
        setProfile((prev) => ({
          ...prev,
          availability: [...prev.availability, slot],
        }))
      }
      setNewAvailability({ day: "", startTime: "", endTime: "" })
    }
  }

  const removeAvailabilitySlot = (index: number) => {
    setProfile((prev) => ({
      ...prev,
      availability: prev.availability.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Teacher Profile Submitted:", profile)
    // Here you would typically send the data to your backend
    alert("Teacher profile created successfully! Welcome to ClassSync!")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <GraduationCap className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">ClassSync</span>
          </Link>
          <Button variant="ghost" asChild>
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>
      </header>

      <div className="py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <GraduationCap className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Become a Teacher</h1>
            {/* <p className="text-gray-600">
              Share your expertise and help students achieve their learning goals through offline classes
            </p> */}
          </div>

          <Card className="shadow-lg">
            <CardHeader className="pb-6">
              <CardTitle className="flex items-center gap-2 text-xl text-gray-800">
                <Award className="h-5 w-5 text-blue-600" />
                Create Your Teaching Profile
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Personal Information */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Personal Information</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName" className="text-sm font-medium text-gray-700">
                        Full Name *
                      </Label>
                      <Input
                        id="fullName"
                        type="text"
                        value={profile.fullName}
                        onChange={(e) => setProfile((prev) => ({ ...prev, fullName: e.target.value }))}
                        placeholder="Enter your full name"
                        required
                        className="h-12 text-base"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile((prev) => ({ ...prev, email: e.target.value }))}
                        placeholder="your.email@example.com"
                        required
                        className="h-12 text-base"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                        Phone Number *
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={profile.phone}
                        onChange={(e) => setProfile((prev) => ({ ...prev, phone: e.target.value }))}
                        placeholder="+91"
                        required
                        className="h-12 text-base"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location" className="text-sm font-medium text-gray-700">
                        Location (City) *
                      </Label>
                      <Input
                        id="location"
                        type="text"
                        value={profile.location}
                        onChange={(e) => setProfile((prev) => ({ ...prev, location: e.target.value }))}
                        placeholder="e.g., New York"
                        required
                        className="h-12 text-base"
                      />
                    </div>
                  </div>

                  {/* <div className="space-y-2">
                    <Label htmlFor="bio" className="text-sm font-medium text-gray-700">
                      Bio / Introduction *
                    </Label>
                    <Textarea
                      id="bio"
                      value={profile.bio}
                      onChange={(e) => setProfile((prev) => ({ ...prev, bio: e.target.value }))}
                      placeholder="Tell students about yourself, your teaching style, expertise areas, and what makes you passionate about teaching. Our AI will analyze this to better match you with students..."
                      required
                      className="min-h-[120px] text-base"
                    />
                    <p className="text-xs text-gray-500">
                      💡 Our AI chatbot will analyze your bio to understand your teaching style, expertise, and
                      preferences
                    </p>
                  </div> */}
                </div>

                {/* Teaching Information */}
                {/* <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Teaching Information</h3> */}

                  {/* Experience */}
                  {/* <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">Teaching Experience *</Label>
                    <Select
                      value={profile.experience}
                      onValueChange={(value) => setProfile((prev) => ({ ...prev, experience: value }))}
                    >
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Select your teaching experience level" />
                      </SelectTrigger>
                      <SelectContent>
                        {EXPERIENCE_LEVELS.map((level) => (
                          <SelectItem key={level} value={level}>
                            {level}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div> */}

                {/* Availability */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Availability</h3>

                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-purple-600" />
                    <Label className="text-sm font-medium text-gray-700">When are you available to teach? *</Label>
                  </div>
                  <p className="text-xs text-gray-500 ml-6">
                    💡 Our AI will use this information along with student preferences to create optimal schedules
                  </p>

                  <div className="space-y-2 p-3 border rounded-lg bg-purple-50 min-h-[3rem]">
                    {profile.availability.map((slot, index) => (
                      <div key={index} className="flex items-center gap-3 p-2 bg-white rounded border">
                        <Calendar className="h-4 w-4 text-purple-600" />
                        <span className="font-medium">{slot.day}</span>
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span className="text-sm">
                          {slot.startTime} - {slot.endTime}
                        </span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeAvailabilitySlot(index)}
                          className="ml-auto text-red-600 hover:text-red-800 hover:bg-red-50"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    {profile.availability.length === 0 && (
                      <span className="text-gray-500 text-sm">Add your available teaching time slots</span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                    <Select
                      value={newAvailability.day}
                      onValueChange={(value) => setNewAvailability((prev) => ({ ...prev, day: value }))}
                    >
                      <SelectTrigger className="h-10">
                        <SelectValue placeholder="Day" />
                      </SelectTrigger>
                      <SelectContent>
                        {DAYS_OF_WEEK.map((day) => (
                          <SelectItem key={day} value={day}>
                            {day}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Select
                      value={newAvailability.startTime}
                      onValueChange={(value) => setNewAvailability((prev) => ({ ...prev, startTime: value }))}
                    >
                      <SelectTrigger className="h-10">
                        <SelectValue placeholder="Start" />
                      </SelectTrigger>
                      <SelectContent>
                        {TIME_SLOTS.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Select
                      value={newAvailability.endTime}
                      onValueChange={(value) => setNewAvailability((prev) => ({ ...prev, endTime: value }))}
                    >
                      <SelectTrigger className="h-10">
                        <SelectValue placeholder="End" />
                      </SelectTrigger>
                      <SelectContent>
                        {TIME_SLOTS.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Button
                      type="button"
                      onClick={addAvailabilitySlot}
                      disabled={!newAvailability.day || !newAvailability.startTime || !newAvailability.endTime}
                      className="h-10 bg-purple-600 hover:bg-purple-700"
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Add
                    </Button>
                  </div>
                </div>

                {/* AI Integration Notice */}
                {/* <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border border-blue-200">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <GraduationCap className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">AI-Powered Matching & Scheduling</h4>
                      <p className="text-sm text-gray-600 mb-2">
                        Our intelligent system will analyze your profile and chat interactions to:
                      </p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Match you with compatible students based on location and teaching style</li>
                        <li>• Understand your expertise areas through your bio and conversations</li>
                        <li>• Create optimal class schedules that work for everyone</li>
                        <li>• Suggest the best times and formats for your classes</li>
                      </ul>
                    </div>
                  </div>
                </div> */}

                {/* Submit Button */}
                <div className="pt-4">
                  <Button
                    type="submit"
                    className="w-full h-12 text-base bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    disabled={
                      !profile.fullName.trim() ||
                      !profile.email.trim() ||
                      !profile.phone.trim() ||
                      !profile.location.trim() ||
                      !profile.bio.trim() ||
                      !profile.experience
                    }
                  >
                    <GraduationCap className="h-5 w-5 mr-2" />
                    Create My Teaching Profile
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
