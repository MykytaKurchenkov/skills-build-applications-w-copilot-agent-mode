import mongoose from 'mongoose';
import { connectDatabase, disconnectDatabase } from '../config/database';
import { User } from '../models/User';
import { Team } from '../models/Team';
import { Activity } from '../models/Activity';
import { Leaderboard } from '../models/Leaderboard';
import { Workout } from '../models/Workout';

/**
 * Seed the octofit_db database with test data
 */

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await connectDatabase();

    // Clear existing data
    console.log('Clearing existing data...');
    await User.deleteMany({});
    await Team.deleteMany({});
    await Activity.deleteMany({});
    await Leaderboard.deleteMany({});
    await Workout.deleteMany({});

    // Create teams
    console.log('Creating teams...');
    const teams = await Team.insertMany([
      {
        name: 'Thunder Runners',
        description: 'A team dedicated to running and marathon training',
        stats: { totalMembers: 0, totalPoints: 0, totalActivities: 0 }
      },
      {
        name: 'Cycle Masters',
        description: 'Expert cyclists pushing the limits',
        stats: { totalMembers: 0, totalPoints: 0, totalActivities: 0 }
      },
      {
        name: 'Gym Warriors',
        description: 'Strength training and bodybuilding enthusiasts',
        stats: { totalMembers: 0, totalPoints: 0, totalActivities: 0 }
      }
    ]);
    console.log(`Created ${teams.length} teams`);

    // Create users
    console.log('Creating users...');
    const users = await User.insertMany([
      {
        username: 'alex_runner',
        email: 'alex@octofit.com',
        profile: { firstName: 'Alex', lastName: 'Johnson', avatar: 'avatar1.jpg' },
        teamId: teams[0]._id,
        stats: { totalActivities: 12, totalDistance: 85.5, totalDuration: 720, points: 1850 }
      },
      {
        username: 'maria_cyclist',
        email: 'maria@octofit.com',
        profile: { firstName: 'Maria', lastName: 'Garcia', avatar: 'avatar2.jpg' },
        teamId: teams[1]._id,
        stats: { totalActivities: 18, totalDistance: 420.3, totalDuration: 1080, points: 2450 }
      },
      {
        username: 'john_gym',
        email: 'john@octofit.com',
        profile: { firstName: 'John', lastName: 'Smith', avatar: 'avatar3.jpg' },
        teamId: teams[2]._id,
        stats: { totalActivities: 25, totalDistance: 0, totalDuration: 1500, points: 3200 }
      },
      {
        username: 'sarah_swimmer',
        email: 'sarah@octofit.com',
        profile: { firstName: 'Sarah', lastName: 'Lee', avatar: 'avatar4.jpg' },
        teamId: teams[0]._id,
        stats: { totalActivities: 15, totalDistance: 45.0, totalDuration: 900, points: 2100 }
      },
      {
        username: 'mike_hiker',
        email: 'mike@octofit.com',
        profile: { firstName: 'Mike', lastName: 'Wilson', avatar: 'avatar5.jpg' },
        teamId: teams[1]._id,
        stats: { totalActivities: 20, totalDistance: 156.8, totalDuration: 1200, points: 2800 }
      }
    ]);
    console.log(`Created ${users.length} users`);

    // Update team member counts
    await Team.findByIdAndUpdate(teams[0]._id, {
      members: [users[0]._id, users[3]._id],
      'stats.totalMembers': 2
    });
    await Team.findByIdAndUpdate(teams[1]._id, {
      members: [users[1]._id, users[4]._id],
      'stats.totalMembers': 2
    });
    await Team.findByIdAndUpdate(teams[2]._id, {
      members: [users[2]._id],
      'stats.totalMembers': 1
    });

    // Create activities
    console.log('Creating activities...');
    const activities = await Activity.insertMany([
      {
        userId: users[0]._id,
        type: 'running',
        distance: 10.5,
        duration: 65,
        calories: 890,
        description: 'Morning run in the park',
        points: 350
      },
      {
        userId: users[0]._id,
        type: 'running',
        distance: 8.2,
        duration: 52,
        calories: 720,
        description: 'Evening jog',
        points: 280
      },
      {
        userId: users[1]._id,
        type: 'cycling',
        distance: 45.3,
        duration: 120,
        calories: 980,
        description: 'Long distance cycling trip',
        points: 450
      },
      {
        userId: users[2]._id,
        type: 'gym',
        distance: 0,
        duration: 90,
        calories: 650,
        description: 'Upper body strength training',
        points: 320
      },
      {
        userId: users[3]._id,
        type: 'swimming',
        distance: 2.5,
        duration: 45,
        calories: 550,
        description: 'Pool swimming session',
        points: 240
      },
      {
        userId: users[4]._id,
        type: 'hiking',
        distance: 15.6,
        duration: 180,
        calories: 1200,
        description: 'Mountain hiking adventure',
        points: 520
      }
    ]);
    console.log(`Created ${activities.length} activities`);

    // Create leaderboard entries
    console.log('Creating leaderboard entries...');
    const leaderboardEntries = await Leaderboard.insertMany([
      {
        userId: users[2]._id,
        username: users[2].username,
        points: 3200,
        rank: 1,
        teamId: teams[2]._id,
        period: 'all-time'
      },
      {
        userId: users[1]._id,
        username: users[1].username,
        points: 2450,
        rank: 2,
        teamId: teams[1]._id,
        period: 'all-time'
      },
      {
        userId: users[4]._id,
        username: users[4].username,
        points: 2800,
        rank: 3,
        teamId: teams[1]._id,
        period: 'all-time'
      },
      {
        userId: users[0]._id,
        username: users[0].username,
        points: 1850,
        rank: 4,
        teamId: teams[0]._id,
        period: 'all-time'
      },
      {
        userId: users[3]._id,
        username: users[3].username,
        points: 2100,
        rank: 5,
        teamId: teams[0]._id,
        period: 'all-time'
      }
    ]);
    console.log(`Created ${leaderboardEntries.length} leaderboard entries`);

    // Create workouts
    console.log('Creating workouts...');
    const workouts = await Workout.insertMany([
      {
        title: 'Morning Run',
        description: 'Start your day with an energizing run',
        type: 'cardio',
        difficulty: 'beginner',
        duration: 30,
        estimatedCalories: 300,
        instructions: ['Warm up for 5 minutes', 'Run at steady pace for 25 minutes', 'Cool down for 5 minutes'],
        equipment: ['Running shoes'],
        suggestedFor: [users[0]._id, users[3]._id]
      },
      {
        title: 'HIIT Strength Training',
        description: 'High intensity interval training for maximum gains',
        type: 'strength',
        difficulty: 'advanced',
        duration: 45,
        estimatedCalories: 450,
        instructions: ['Warm up for 10 minutes', 'Perform 8 rounds of 30s work/30s rest', 'Cool down and stretch'],
        equipment: ['Dumbbells', 'Pull-up bar'],
        suggestedFor: [users[2]._id]
      },
      {
        title: 'Cycling Adventure',
        description: 'Long distance cycling for endurance building',
        type: 'cardio',
        difficulty: 'intermediate',
        duration: 90,
        estimatedCalories: 800,
        instructions: ['Start with a 10 minute warm-up', 'Ride at moderate pace', 'Cool down'],
        equipment: ['Bicycle'],
        suggestedFor: [users[1]._id, users[4]._id]
      },
      {
        title: 'Yoga & Flexibility',
        description: 'Improve flexibility and reduce stress',
        type: 'flexibility',
        difficulty: 'beginner',
        duration: 60,
        estimatedCalories: 150,
        instructions: ['Sun salutations', 'Standing poses', 'Floor poses', 'Savasana'],
        equipment: ['Yoga mat'],
        suggestedFor: [users[0]._id, users[1]._id, users[3]._id]
      },
      {
        title: 'Swimming Workout',
        description: 'Full body workout in the pool',
        type: 'cardio',
        difficulty: 'intermediate',
        duration: 60,
        estimatedCalories: 600,
        instructions: ['Warm-up laps', 'Sprint intervals', 'Cool-down laps'],
        equipment: ['Swimming goggles'],
        suggestedFor: [users[3]._id]
      }
    ]);
    console.log(`Created ${workouts.length} workouts`);

    console.log('\n✅ Database seeding completed successfully!');
    console.log(`Summary:
    - Teams: ${teams.length}
    - Users: ${users.length}
    - Activities: ${activities.length}
    - Leaderboard entries: ${leaderboardEntries.length}
    - Workouts: ${workouts.length}`);

  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    await disconnectDatabase();
    process.exit(0);
  }
}

// Run the seed script
seedDatabase();
