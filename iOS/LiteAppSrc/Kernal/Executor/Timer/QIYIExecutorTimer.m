/**
 *
 * Copyright 2018 iQIYI.com
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
//
//  QIYIExecutorTimer.m
//  QIYIMiniProgram
//
//  Created by Breakerror on 2018/2/28.
//  Copyright © 2018年 Breakerror. All rights reserved.
//

#import "QIYIExecutorTimer.h"

@interface QIYIExecutorTimer()
@property(nonatomic, assign, readwrite) NSInteger handle;
@property(nonatomic, assign, readwrite) NSInteger count;
@property(nonatomic, strong, readwrite) NSMutableArray* heapArray;
@property(nonatomic, strong, readwrite) NSMutableDictionary* heapNodePool;
@end

@implementation QIYIExecutorTimer

-(instancetype) init {
    if (self = [super init]) {
        self.handle = self.count = 0;
        self.heapArray = [[NSMutableArray alloc] init];
        self.heapNodePool = [[NSMutableDictionary alloc] init];
        [self.heapArray addObject:[NSNull null]];
    }
    return self;
}

-(long long) getCurrentTime {
    return (long long)([[NSDate date] timeIntervalSince1970] * 1000);
}

-(void) tick {
    long long time = [self getCurrentTime];
    while (1) {
        if (self.count <= 0) {
            break;
        }
        
        QIYIExecutorTimerItem* item = [self headNode];
        if (item.timeout > time || item.lastInvoke == time) {
            break;
        }
        
        if (item.callback) {
            [item.callback callWithArguments:@[@(item.handle)]];
        }
        item.lastInvoke = time;
        
        if (self.count > 0 && [self headNode].handle == item.handle) {
            if (item.loop) {
                item.startTime = time;
                [self adjustmentIndex:1 whetherDeep:YES];
            } else {
                [self removeNodeAtIndex:1];
            }
        }
    }
}

-(void) removeAll {
    self.count = 0;
    [self.heapArray removeAllObjects];
    [self.heapNodePool removeAllObjects];
}

-(JSValue*) removeNodeAtIndex:(NSInteger)index {
    if (index < 1 || index > self.count) {
        return nil;
    }
    
    QIYIExecutorTimerItem* item =
    (QIYIExecutorTimerItem*)self.heapArray[index];
    JSValue* callback = item.callback;
    if (nil == item) {
        return nil;
    }
    [self.heapNodePool removeObjectForKey:@(item.handle)];
    
    if (index == self.count) {
        self.count--; item.callback = nil;
    } else {
        self.heapArray[index] = self.heapArray[self.count];
        ((QIYIExecutorTimerItem*)self.heapArray[index]).index = index;
        self.heapArray[self.count] = [NSNull null];
        self.count--;
        [self adjustmentIndex:index whetherDeep:NO];
    }
    return callback;
}

-(JSValue*) removeNodeForHandle:(NSInteger)index {
    QIYIExecutorTimerItem* item = [self.heapNodePool objectForKey:@(index)];
    if (nil == item) {
        return nil;
    }
    return [self removeNodeAtIndex:item.index];
}

-(NSInteger) nextTimeout {
    if (self.count < 1) {
        return NSIntegerMax;
    }
    
    long long time = [self headNode].timeout;
    time -= [self getCurrentTime];
    return (time > 0 ? (NSInteger)(time) : 0);
}

-(NSInteger) timerCount {
    return self.count;
}

-(NSInteger) addNode:(NSInteger)time withBlock:(JSValue*)block loop:(BOOL)loop {
    if (nil == block) {
        return 0;
    }
    
    NSInteger handle = ++self.handle;
    QIYIExecutorTimerItem* node = [[QIYIExecutorTimerItem alloc] init];
    node.index = 0; node.loop = loop; node.handle = handle;
    node.interval = time; node.startTime = [self getCurrentTime];
    node.callback = block;
    [self.heapNodePool setObject:node forKey:@(handle)];
    
    self.count++;
    if (self.count > [self.heapArray count] - 1) {
        [self.heapArray addObject:node];
    } else {
        self.heapArray[self.count] = node;
    }
    node.index = self.count;
    
    NSInteger modifyIndex = node.index;
    while (YES) {
        NSInteger parentIndex = modifyIndex / 2;
        if (0 == parentIndex) {
            break;
        }
        
        QIYIExecutorTimerItem* parent = self.heapArray[parentIndex];
        QIYIExecutorTimerItem* current = self.heapArray[modifyIndex];
        if (parent.timeout <= current.timeout) {
            break;
        }
        
        self.heapArray[modifyIndex] = parent;
        parent.index = modifyIndex;
        self.heapArray[parentIndex] = current;
        current.index = parentIndex;
        modifyIndex = parentIndex;
    }
    return handle;
}

-(QIYIExecutorTimerItem*) removeHeadNode {
    QIYIExecutorTimerItem* head = nil;
    if (self.count > 0) {
        head = [self.heapArray objectAtIndex:1];
        [self removeNodeAtIndex:1];
    }
    return head;
}

-(QIYIExecutorTimerItem*) headNode {
    if (self.count > 0) {
        return [self.heapArray objectAtIndex:1];
    }
    return nil;
}

-(BOOL) adjustmentIndex:(NSInteger)index whetherDeep:(BOOL)deep {
    if (index < 1 || index > self.count) {
        return NO;
    }
    
    NSInteger modifyIndex = index;
    while (YES) {
        QIYIExecutorTimerItem* left = nil;
        NSInteger leftChildIndex = modifyIndex * 2;
        if (leftChildIndex <= self.count) {
            left = self.heapArray[leftChildIndex];
        }
        
        QIYIExecutorTimerItem* right = nil;
        NSInteger rightChildIndex = modifyIndex * 2 + 1;
        if (rightChildIndex <= self.count) {
            right = self.heapArray[rightChildIndex];
        }
        if (nil == left && nil == right) break;
        
        QIYIExecutorTimerItem* min = nil;
        NSInteger minChildIndex = 0;
        if (nil != left) {
            min = left;
            minChildIndex = leftChildIndex;
        }
        
        if (nil != right && (nil == min || right.timeout < min.timeout)) {
            min = right;
            minChildIndex = rightChildIndex;
        }
        
        if (nil != min) {
            QIYIExecutorTimerItem* modify = self.heapArray[modifyIndex];
            if (min.timeout < modify.timeout || (min.timeout == modify.timeout && deep)) {
                self.heapArray[modifyIndex] = self.heapArray[minChildIndex];
                ((QIYIExecutorTimerItem*)(self.heapArray[modifyIndex])).index = modifyIndex;
                self.heapArray[minChildIndex] = modify;
                modify.index = minChildIndex; modifyIndex = minChildIndex;
            } else {
                break;
            }
        }
    }
    return YES;
}
@end

