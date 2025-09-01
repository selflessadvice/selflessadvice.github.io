"use client"

import { motion } from "framer-motion"
import { Heart, Users, BookOpen, Target, Award, Globe } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-playfair text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              About <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Selfless Advice</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              We believe that true wisdom comes from selfless sharing and authentic connection. 
              Our mission is to provide life-changing advice that helps people discover their purpose, 
              find genuine happiness, and live more meaningful lives.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="font-playfair text-4xl font-bold text-gray-900 mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                In a world filled with noise and superficial advice, we strive to cut through the clutter 
                and provide authentic, actionable wisdom that truly makes a difference in people's lives.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Every piece of content we create is carefully crafted with love, research, and genuine 
                care for our readers' wellbeing and personal growth.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-6"
            >
              <div className="text-center p-6 bg-blue-50 rounded-lg">
                <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <div className="text-3xl font-bold text-gray-900 mb-2">1000+</div>
                <div className="text-gray-600">Lives Transformed</div>
              </div>
              <div className="text-center p-6 bg-purple-50 rounded-lg">
                <BookOpen className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <div className="text-3xl font-bold text-gray-900 mb-2">50+</div>
                <div className="text-gray-600">Wisdom Articles</div>
              </div>
              <div className="text-center p-6 bg-pink-50 rounded-lg">
                <Globe className="w-12 h-12 text-pink-600 mx-auto mb-4" />
                <div className="text-3xl font-bold text-gray-900 mb-2">25+</div>
                <div className="text-gray-600">Countries Reached</div>
              </div>
              <div className="text-center p-6 bg-green-50 rounded-lg">
                <Heart className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <div className="text-3xl font-bold text-gray-900 mb-2">100%</div>
                <div className="text-gray-600">Free Content</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-playfair text-4xl font-bold text-gray-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These principles guide everything we do and every piece of advice we share.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center p-8 bg-white rounded-lg shadow-lg"
            >
              <Heart className="w-16 h-16 text-red-500 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Authenticity</h3>
              <p className="text-gray-600 leading-relaxed">
                We believe in genuine, heartfelt advice that comes from real experience and deep understanding, 
                not just theoretical knowledge.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center p-8 bg-white rounded-lg shadow-lg"
            >
              <Target className="w-16 h-16 text-blue-500 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Purpose</h3>
              <p className="text-gray-600 leading-relaxed">
                Every piece of content serves a clear purpose: to help you find meaning, 
                grow as a person, and create positive change in your life.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center p-8 bg-white rounded-lg shadow-lg"
            >
              <Award className="w-16 h-16 text-green-500 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Excellence</h3>
              <p className="text-gray-600 leading-relaxed">
                We're committed to providing the highest quality advice, thoroughly researched 
                and presented in a way that's both accessible and actionable.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="font-playfair text-4xl font-bold text-gray-900 mb-8">
              Our Story
            </h2>
            <div className="prose prose-lg mx-auto text-gray-600">
              <p className="text-xl leading-relaxed mb-6">
                Selfless Advice was born from a simple observation: in our fast-paced, digital world, 
                people are hungry for genuine wisdom and authentic connection. Too often, advice comes 
                with hidden agendas, commercial interests, or superficial understanding.
              </p>
              <p className="text-xl leading-relaxed mb-6">
                We decided to create something different—a space where wisdom is shared freely, 
                where advice comes from the heart, and where the only agenda is helping people 
                live better, more fulfilling lives.
              </p>
              <p className="text-xl leading-relaxed">
                Today, we're proud to be a trusted source of life-changing advice for thousands 
                of people around the world, and we're just getting started.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-playfair text-4xl font-bold text-white mb-6">
              Join Our Community
            </h2>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Be part of a growing community of people committed to personal growth, 
              authentic living, and making a positive impact in the world.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="/#wisdom"
                className="px-8 py-4 bg-white text-blue-600 rounded-full hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 font-semibold text-lg"
              >
                Explore Our Wisdom
              </a>
              <a
                href="/donate"
                className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full hover:bg-white hover:text-blue-600 transition-all duration-300 font-semibold text-lg"
              >
                Support Our Mission
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}